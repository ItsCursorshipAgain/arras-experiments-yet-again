const {combineStats} = require('../facilitators.js')
const g = require('../gunvals.js')
// Generator code by Taureon

Class.generatorBase = {
    PARENT: "genericTank",
    LABEL: "Generator",
    ALPHA: 0,
    IGNORED_BY_AI: true,
    CAN_BE_ON_LEADERBOARD: false,
    ACCEPTS_SCORE: false,
    DRAW_HEALTH: false,
    HITS_OWN_TYPE: "never",
    ARENA_CLOSER: true,
    IS_IMMUNE_TO_TILES: true,
    SKILL_CAP: [31, 0, 0, 0, 0, 0, 0, 0, 0, 31],
    BODY: {
        SPEED: 5,
        FOV: 2.5,
        DAMAGE: 0,
        HEALTH: 1e100,
        SHIELD: 1e100,
        REGEN: 1e100,
    },
}

function compileMatrix(matrix, matrix2Entrance) {
    let matrixWidth = matrix[0].length,
        matrixHeight = matrix.length;
    for (let x = 0; x < matrixWidth; x++) for (let y = 0; y < matrixHeight; y++) {
        let str = matrix[y][x],
            LABEL = ensureIsClass(str).LABEL + " Generator",
            code = str + 'Generator';
        Class[code] = matrix[y][x] = {
            PARENT: "generatorBase",
            LABEL,
            TURRETS: [{
                POSITION: [5 + y * 2, 0, 0, 0, 0, 1],
                TYPE: str,
            }],
            GUNS: [{
                POSITION: [14, 12, 1, 4, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }, g.fake]),
                    TYPE: "bullet"
                }
            }, {
                POSITION: [12, 12, 1.4, 4, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }]),
                    INDEPENDENT_CHILDREN: true,
                    TYPE: str
                },
            }],
        };
    }
}
function connectMatrix(matrix, matrix2Entrance) {
    let matrixWidth = matrix[0].length,
        matrixHeight = matrix.length;
    for (let x = 0; x < matrixWidth; x++) for (let y = 0; y < matrixHeight; y++) {
        let top = (y + matrixHeight - 1) % matrixHeight,
            bottom = (y + matrixHeight + 1) % matrixHeight,
            left = (x + matrixWidth - 1) % matrixWidth,
            right = (x + matrixWidth + 1) % matrixWidth,

        center = matrix[y     ][x    ];
        top    = matrix[top   ][x    ];
        bottom = matrix[bottom][x    ];
        left   = matrix[y     ][left ];
        right  = matrix[y     ][right];

        matrix[y][x].UPGRADES_TIER_0 = [
            "developer" ,  top    , "spectator",
             left       ,  center ,  right,
            "basic"     ,  bottom ,  matrix2Entrance
        ];
    }
}
let generatorMatrix = [
    [ "egg"           , "gem"                , "jewel"                  , "crasher"             , "sentry"               , "shinySentry"        , "EggRelic"           ],
    [ "square"        , "shinySquare"        , "legendarySquare"        , "shadowSquare"        , "rainbowSquare"        , "transSquare"        , "SquareRelic"        ],
    [ "triangle"      , "shinyTriangle"      , "legendaryTriangle"      , "shadowTriangle"      , "rainbowTriangle"      , "transTriangle"      , "TriangleRelic"      ],
    [ "pentagon"      , "shinyPentagon"      , "legendaryPentagon"      , "shadowPentagon"      , "rainbowPentagon"      , "transPentagon"      , "PentagonRelic"      ],
    [ "betaPentagon"  , "shinyBetaPentagon"  , "legendaryBetaPentagon"  , "shadowBetaPentagon"  , "rainbowBetaPentagon"  , "transBetaPentagon"  , "BetaPentagonRelic"  ],
    [ "alphaPentagon" , "shinyAlphaPentagon" , "legendaryAlphaPentagon" , "shadowAlphaPentagon" , "rainbowAlphaPentagon" , "transAlphaPentagon" , "AlphaPentagonRelic" ],
    [ "hexagon_old"   , "shinyHexagon_old"   , "legendaryHexagon_old"   , "shadowHexagon_old"   , "rainbowHexagon_old"   , "transHexagon_old"   , "Hexagon_oldRelic"   ],
    [ "septagon"      , "shinySeptagon"      , "legendarySeptagon"      , "shadowSeptagon"      , "rainbowSeptagon"      , "transSeptagon"      , "SeptagonRelic"      ],
    [ "octagon"       , "shinyOctagon"       , "legendaryOctagon"       , "shadowOctagon"       , "rainbowOctagon"       , "transOctagon"       , "OctagonRelic"       ],
    [ "nonagon"       , "shinyNonagon"       , "legendaryNonagon"       , "shadowNonagon"       , "rainbowNonagon"       , "transNonagon"       , "NonagonRelic"       ],
    [ "sphere"        , "cube"               , "tetrahedron"            , "octahedron"          , "dodecahedron"         , "icosahedron"        , "tesseract"          ],
],
gemRelicMatrix = [];
for (let tier of [ "", "Egg", "Square", "Triangle", "Pentagon", "BetaPentagon", "AlphaPentagon", "Hexagon_old", "Septagon", "Octagon", "Nonagon" ]) {
    let row = [];
    for (let gem of [ "Power", "Space", "Reality", "Soul", "Time", "Mind" ]) {
        row.push(gem + (tier ? tier + 'Relic' : 'Gem'));
    }
    gemRelicMatrix.push(row);
}

compileMatrix(generatorMatrix)
compileMatrix(gemRelicMatrix)

// Tensor = N-Dimensional Array, BASICALLY
let labyTensor = [];
for (let poly = 0; poly < 5; poly++) {
    let row = [];
    for (let tier = 0; tier < 6; tier++) {
        let column = [];
        for (let shiny = 0; shiny < 6; shiny++) {
            let tube = [];
            for (let rank = 0; rank < 2; rank++) {
                let str = `laby_${poly}_${tier}_${shiny}_${rank}`,
                    LABEL = /*"Laby " +*/ ensureIsClass(str).LABEL + " Generator";
                Class['generator_' + str] = {
                    PARENT: "generatorBase",
                    LABEL,
                    TURRETS: [{
                        POSITION: [5 + tier * 2, 0, 0, 0, 0, 1],
                        TYPE: str,
                    }],
                    GUNS: [{
                        POSITION: [14, 12, 1, 4, 0, 0, 0],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }, g.fake]),
                            TYPE: "bullet"
                        }
                    }, {
                        POSITION: [12, 12, 1.4, 4, 0, 0, 0],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }]),
                            INDEPENDENT_CHILDREN: true,
                            TYPE: str
                        },
                    }],
                };
                tube.push('generator_' + str);
            }
            column.push(tube);
        }
        row.push(column);
    }
    labyTensor.push(row);
}

connectMatrix(generatorMatrix, 'PowerGemGenerator')
connectMatrix(gemRelicMatrix, 'generator_laby_0_0_0_0')

let tensorWidth = labyTensor.length,
    tensorHeight = labyTensor[0].length,
    tensorLength = labyTensor[0][0].length,
    tensorDepth = labyTensor[0][0][0].length;

for (let x = 0; x < tensorWidth; x++) {
    for (let y = 0; y < tensorHeight; y++) {
        for (let z = 0; z < tensorLength; z++) {
            for (let w = 0; w < tensorDepth; w++) {

                let left = (x + tensorWidth - 1) % tensorWidth,
                    right = (x + tensorWidth + 1) % tensorWidth,
                    top = (y + tensorHeight - 1) % tensorHeight,
                    bottom = (y + tensorHeight + 1) % tensorHeight,
                    front = (z + tensorLength - 1) % tensorLength,
                    back = (z + tensorLength + 1) % tensorLength,
                    past = (w + tensorDepth - 1) % tensorDepth,
                    future = (w + tensorDepth + 1) % tensorDepth,
            
                center = labyTensor[x    ][y     ][z    ][w     ];
                top    = labyTensor[x    ][top   ][z    ][w     ];
                bottom = labyTensor[x    ][bottom][z    ][w     ];
                left   = labyTensor[left ][y     ][z    ][w     ];
                right  = labyTensor[right][y     ][z    ][w     ];
                front  = labyTensor[x    ][y     ][front][w     ];
                back   = labyTensor[x    ][y     ][back ][w     ];
                past   = labyTensor[x    ][y     ][z    ][past  ];
                future = labyTensor[x    ][y     ][z    ][future];

                Class[labyTensor[x][y][z][w]].UPGRADES_TIER_0 = [
                    "developer"         , left  , right  ,
                    "basic"             , top   , bottom ,
                    "eggGenerator"      , front , back   ,
                    "PowerGemGenerator" , past  , future
                ];
            }
        }
    }
}
