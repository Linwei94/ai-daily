#!/usr/bin/env python3
"""For each topic with papers, build a filtered subgraph from graph/global/graph.json
and render it to graph/<topic>/graph.html.

Subgraph includes:
  - All nodes whose source_file contains 'topics/<topic>/'
  - Their 1-hop neighbors (so cross-topic bridges still show context)
"""
import json, sys, pathlib
from networkx.readwrite import json_graph
from graphify.export import to_html

ROOT = pathlib.Path(__file__).resolve().parent.parent
GLOBAL = ROOT / 'graph' / 'global' / 'graph.json'
if not GLOBAL.exists():
    print('no global graph yet'); sys.exit(0)

data = json.loads(GLOBAL.read_text())
G = json_graph.node_link_graph(data)

topics = [d.name for d in (ROOT/'topics').iterdir() if d.is_dir() and any(d.iterdir())]
topics = [t for t in topics if (ROOT/'topics'/t).glob('*/paper.md') and any((ROOT/'topics'/t).glob('*/paper.md'))]

# Re-derive community ids from existing graph node attributes if present
# (graphify stores 'community' attr per node)
def community_map(graph):
    m = {}
    for nid, attrs in graph.nodes(data=True):
        cid = attrs.get('community', 0)
        m.setdefault(cid, []).append(nid)
    return m

for topic in topics:
    needle = f'topics/{topic}/'
    core = [nid for nid, a in G.nodes(data=True) if needle in (a.get('source_file') or '')]
    if not core:
        print(f'skip {topic}: no nodes'); continue
    # 1-hop expansion
    nodes = set(core)
    for n in core:
        nodes.update(G.neighbors(n))
    sub = G.subgraph(nodes).copy()
    out_dir = ROOT / 'graph' / topic
    out_dir.mkdir(parents=True, exist_ok=True)
    comms = community_map(sub)
    # carry over labels if present in global
    labels = {}
    label_path = ROOT / 'graphify-out' / '.graphify_labels.json'
    if label_path.exists():
        try: labels = {int(k):v for k,v in json.loads(label_path.read_text()).items()}
        except Exception: pass
    to_html(sub, comms, str(out_dir/'graph.html'), community_labels=labels or None)
    # save filtered json too
    (out_dir/'graph.json').write_text(json.dumps(json_graph.node_link_data(sub), indent=2))
    print(f'{topic}: {sub.number_of_nodes()} nodes, {sub.number_of_edges()} edges -> graph/{topic}/')
