Globally...

Fetch for Hikes
    Get Hike Data
Fetch for Trails
    Get Trail Data
Fetch for Hikers
    Get Hiker Data


From this data, build a new global state for Hikes that includes actual trail data and actual hiker data.

let hikes = [
    {id: 1, trailId: 1, hikerId: 1, difficulty: 3},
    {id: 2, trailId: 6, hikerId: 5, difficulty: 6},
    {id: 3, trailId: 11, hikerId: 2, difficulty: 1}
]
let trails = [
    {id: 1, state: "AL", name: "Funzo Trail"},
    {id: 2, state: "CA", name: "Hummingbird Trail"},
    {id: 3, state: "MD", name: "Patapsco Trail"}
]
let hikers = [
    {id: 1, name: "Oak"},
    {id: 2, name: "Jess" },
    {id: 3, name: "Austin"}
]

let rebuiltHikesWithTrails = hikes.map(hike => {
    let foundTrail = trails.filter(trail => trail.trailId === hike.trailId);
    let foundHiker = hikers.filter(hiker => hiker.hikerId === hike.hikerId);
    hike["trail"] = foundTrail;
    hike["hiker"] = foundHiker;
    return hike;
})