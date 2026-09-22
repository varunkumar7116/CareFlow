# CareFlow Navigate (2D Indoor Navigation Engine)

## Graph Model
The indoor navigation system uses a spatial graph model:
- `Building` (Facility ID, Name)
- `Floor` (Level number, Map image/SVG URL)
- `NavNode` (ID, Floor ID, Name, Coordinates (X, Y), Node Type: `ENTRANCE`, `OPD`, `LAB`, `RADIOLOGY`, `PHARMACY`, `WARD`, `ELEVATOR`, `STAIRS`, `EXIT`)
- `NavEdge` (Source Node, Target Node, Distance meters, Accessible options: `hasStairs`, `hasElevator`, `isWheelchairAccessible`)
- `QrAnchor` (QR Code String, Node ID)

## Routing Algorithm
Dijkstra shortest-path algorithm with dynamic edge filtering based on user preferences:
- `NORMAL`: Standard shortest path.
- `WHEELCHAIR`: Exclude edges where `isWheelchairAccessible` is false.
- `AVOID_STAIRS`: Exclude edges where `hasStairs` is true.
- `LIFT_PREFERRED`: Weight elevators/lifts over stairs.
