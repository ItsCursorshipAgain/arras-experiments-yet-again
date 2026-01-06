const {combineStats, makeAuto, makeBird, makeDrive, makeHat, makeMenu, makeOver, makeRadialAuto, makeTurret, makeWhirlwind, weaponArray, weaponMirror, weaponStack} = require('../../facilitators.js')
const {base, statnames} = require('../../constants.js')
const g = require('../../gunvals.js')
const preset = require('../../presets.js')

// Settings
const integrate_healers = false

const use_original_tree = false // Set to true to enable the original arras.io Arms Race tree and level cap, with some minor bugfixes.

// Function Presets (makeAuto)
driveAuto_options = {type: "driveAutoTurret_AR", size: 9, clearTurrets: true}
stormAuto_options = {type: "stormAutoTurret_AR", size: 9, clearTurrets: true}
whirlAuto_options = {type: "blankAutoTurret_AR", size: 8}

// Function Presets (makeDrive)
storm_options = {suffix: "storm", type: "swarmAutoTurret_AR", hatType: "stormSquare_AR", size: 12}
cruiserstorm_options = {suffix: "storm", type: "swarmAutoTurret_AR", hatType: "stormTriangle_AR", hatSize: 8, hatAngle: 180}

// Gun Presets
birdSuper_rear = [
    ...weaponMirror([{
        POSITION: {
            LENGTH: 14,
            WIDTH: 9,
            ANGLE: 133,
            DELAY: 0.1
        },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster, { recoil: 0.5 }]),
            TYPE: "bullet",
            LABEL: "Thruster"
        }
    },
    {
        POSITION: {
            LENGTH: 16,
            WIDTH: 9,
            ANGLE: 153,
            DELAY: 0.35
        },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster, { recoil: 0.5 }]),
            TYPE: "bullet",
            LABEL: "Thruster"
        }
    }]),
    {
        POSITION: {
            LENGTH: 18,
            WIDTH: 9,
            ANGLE: 180,
            DELAY: 0.6
        },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster, { recoil: 0.5 }]),
            TYPE: "bullet",
            LABEL: "Thruster"
        }
    }
]

// Credits
// - u/SkyShredder89: Default Tier 3/4 Sprayer upgrades

// Hats
Class.crusierdriveHat_AR = makeHat(3.5, {color: "grey"})
Class.healerHat_spin = makeHat([[0.3, -0.3],[1,-0.3],[1,0.3],[0.3,0.3],[0.3,1],[-0.3,1],[-0.3,0.3],[-1,0.3],[-1,-0.3],[-0.3,-0.3],[-0.3,-1],[0.3,-1]], { color: "red", rotationSpeed: 0.16 })
Class.stormSquare_AR = {
    PARENT: "squareHat",
    LABEL: "Storm Square",
    COLOR: "grey",
    GUNS: weaponMirror({
        POSITION: {
            LENGTH: 9,
            WIDTH: 8.2,
            ASPECT: 0.6,
            X: 5,
            ANGLE: 90
        }
    })
}
Class.stormTriangle_AR = {
    PARENT: "stormSquare_AR",
    SHAPE: 3,
    GUNS: weaponMirror({
        POSITION: {
            LENGTH: 9,
            WIDTH: 8.2,
            ASPECT: 0.6,
            X: 5,
            ANGLE: 60
        }
    })
}
Class.downpourerSquare_AR = {
    PARENT: "stormSquare_AR",
    GUNS: weaponMirror([
        {
            POSITION: {
                LENGTH: 15.5,
                WIDTH: 7,
                ANGLE: 90
            }
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 9,
                ASPECT: -1.2,
                ANGLE: 90
            }
        },
        {
            POSITION: {
                LENGTH: 1,
                WIDTH: 9,
                X: 15.5,
                ANGLE: 90
            }
        }
    ])
}
Class.vortexSquare_AR = {
    PARENT: "stormSquare_AR",
    GUNS: weaponArray({
        POSITION: {
            LENGTH: 9,
            WIDTH: 8.2,
            ASPECT: 0.6,
            X: 5
        }
    }, 4)
}

// Projectiles
Class.mechTrap_AR = makeAuto("trap", {type: "droneAutoTurret"})
Class.pentaseerSunchip_AR = {
    PARENT: "sunchip",
    NECRO: [5],
    SHAPE: 5
}

// Turrets
Class.blankAutoTurret_AR = {PARENT: "autoTurret", SHAPE: 1}
Class.driveAutoTurret_AR = {PARENT: "autoTurret", SHAPE: 4}
Class.stormAutoTurret_AR = {
    PARENT: "driveAutoTurret_AR",
    GUNS: [
        ...Class.autoTurret.GUNS,
        ...Class.stormSquare_AR.GUNS
    ]
}

Class.healerAutoTankGun_AR = makeTurret({
    GUNS: [
        {
            POSITION: {
                LENGTH: 11,
                WIDTH: 9,
                ASPECT: -0.4,
                X: 9.5
            }
        },
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 10
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.healer]),
                TYPE: "healerBullet",
            }
        }
    ],
    TURRETS: [
        {
            TYPE: "healerHat",
            POSITION: {
                SIZE: 13,
                LAYER: 1
            }
        }
    ],
}, {canRepel: true, limitFov: true, fov: 3})

Class.swarmAutoTurret_AR = makeTurret({
    GUNS: weaponMirror({
        POSITION: {
            LENGTH: 9,
            WIDTH: 8.2,
            ASPECT: 0.6,
            X: 5,
            ANGLE: 90
        },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: "swarm",
            STAT_CALCULATOR: "swarm"
        }
    })
}, {label: "Turret", fov: 0.8, extraStats: []})
Class.vortexAutoTurret_AR = makeTurret({
    GUNS: weaponArray({
        POSITION: {
            LENGTH: 9,
            WIDTH: 8.2,
            ASPECT: 0.6,
            X: 5
        },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: "swarm",
            STAT_CALCULATOR: "swarm"
        }
    }, 4, 0.25)
}, {label: "Turret", fov: 0.8, extraStats: []})

// Tier 2
Class.diesel_AR = {
    PARENT: "genericTank",
    LABEL: "Diesel",
    DANGER: 6,
    GUNS: [
        {
            POSITION: {
                LENGTH: 14,
                WIDTH: 12,
                ASPECT: 1.6,
                X: 8
            }
        }
    ]
}
Class.directordrive_AR = makeDrive("director")
Class.doper_AR = {
    PARENT: "genericTank",
    LABEL: "Doper",
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        FOV: base.FOV * 1.1
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 5,
                WIDTH: 11,
                ASPECT: 1.3,
                X: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, {speed: 2}]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "drone",
                MAX_CHILDREN: 6,
                WAIT_TO_CYCLE: true
            }
        },
        {
            POSITION: {
                LENGTH: 6,
                WIDTH: 1,
                ASPECT: -5,
                X: 8
            }
        }
    ]
}
Class.honcho_AR = {
    PARENT: "genericTank",
    LABEL: "Honcho",
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        FOV: base.FOV * 1.1
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 11,
                WIDTH: 14,
                ASPECT: 1.3,
                X: 2
            }
        }
    ]
}
Class.machineTrapper_AR = {
    PARENT: "genericTank",
    LABEL: "Machine Trapper",
    DANGER: 6,
    STAT_NAMES: statnames.trap,
    GUNS: [
        {
            POSITION: {
                LENGTH: 15,
                WIDTH: 9,
                ASPECT: 1.4
            }
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 13,
                ASPECT: 1.3,
                X: 15
            }
        }
    ]
}
Class.mech_AR = {
    PARENT: "genericTank",
    LABEL: "Mech",
    DANGER: 6,
    STAT_NAMES: statnames.trap,
    GUNS: [
        {
            POSITION: {
                LENGTH: 15,
                WIDTH: 8
            }
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 11
            }
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 8,
                ASPECT: 1.7,
                X: 15
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "mechTrap_AR",
                STAT_CALCULATOR: "trap"
            }
        }
    ]
}
Class.pen_AR = {
    PARENT: "genericTank",
    LABEL: "Pen",
    DANGER: 6,
    STAT_NAMES: statnames.trap,
    GUNS: [
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 4,
                WIDTH: 8,
                ASPECT: 1.7,
                X: 13
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap"
            }
        }
    ]
}
Class.wark_AR = {
    PARENT: "genericTank",
    LABEL: "Wark",
    DANGER: 6,
    STAT_NAMES: statnames.trap,
    GUNS: weaponMirror([
        {
            POSITION: {
                LENGTH: 15,
                WIDTH: 8,
                Y: 5.5,
                ANGLE: 5
            }
        },
        {
            POSITION: {
                LENGTH: 3.25,
                WIDTH: 8,
                ASPECT: 1.7,
                X: 14,
                Y: 5.5,
                ANGLE: 5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap"
            }
        }
    ], { delayIncrement: 0.5 })
}

// Tier 3
Class.PLACEHOLDER_hybridMarksman_AR = makeOver("marksman", "", preset.hybrid)
Class.PLACEHOLDER_autoHybridMarksman_AR = makeAuto("PLACEHOLDER_hybridMarksman_AR")
Class.analyzer_AR = {
    PARENT: "genericHealer",
    LABEL: "Analyzer",
    GUNS: [
        {
            POSITION: {
                LENGTH: 11,
                WIDTH: 12,
                ASPECT: -0.4,
                X: 9.5
            }
        },
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 13
            }
        }
    ]
}
Class.autoArtillery_AR = makeAuto("artillery")
Class.autoAuto3_AR = makeAuto("auto3")
Class.autoBlaster_AR = makeAuto("blaster")
Class.autoDestroyer_AR = makeAuto("destroyer")
Class.autoDiesel_AR = makeAuto("diesel_AR")
Class.autoDirectordrive_AR = makeAuto("directordrive_AR", "Auto-Directordrive", driveAuto_options)
Class.autoDoper_AR = makeAuto("doper_AR")
Class.autoDoubleMachine_AR = makeAuto("doubleMachine")
Class.autoGatlingGun_AR = makeAuto("gatlingGun")
Class.autoHelix_AR = makeAuto("helix")
Class.autoHexaTank_AR = makeAuto("hexaTank")
Class.autoHoncho_AR = makeAuto("honcho_AR")
Class.autoHunter_AR = makeAuto("hunter")
Class.autoLauncher_AR = makeAuto("launcher")
Class.autoMachineTrapper_AR = makeAuto("machineTrapper_AR")
Class.autoMarksman_AR = makeAuto("marksman")
Class.autoMech_AR = makeAuto("mech_AR")
Class.autoMinigun_AR = makeAuto("minigun")
Class.autoPen_AR = makeAuto("pen_AR")
Class.autoRepeater_AR = makeAuto("repeater")
Class.autoRifle_AR = makeAuto("rifle")
Class.autoSpiral_AR = makeAuto("spiral")
Class.autoSprayer_AR = makeAuto("sprayer")
Class.autoTrapGuard_AR = makeAuto("trapGuard")
Class.autoTripleShot_AR = makeAuto("tripleShot")
Class.autoUnderseer_AR = makeAuto("underseer")
Class.autoVolute_AR = makeAuto("volute")
Class.autoWark_AR = makeAuto("wark_AR")
Class.baltimore_AR = {
    PARENT: "genericTank",
    LABEL: "Baltimore",
    DANGER: 7,
    STAT_NAMES: statnames.swarm,
    GUNS: weaponMirror({
        POSITION: {
            LENGTH: 12.,
            WIDTH: 8.7,
            ASPECT: 0.75,
            X: 3,
            Y: 4.6
        }
    }, { delayIncrement: 0.5 })
}
Class.banger_AR = {
    PARENT: "genericSmasher",
    LABEL: "Banger",
    DANGER: 7,
    TURRETS: [
        {
            TYPE: "digDigHat",
            POSITION: { SIZE: 27 }
        }
    ]
}
Class.bentGunner_AR = {
    PARENT: "genericTank",
    LABEL: "Bent Gunner",
    DANGER: 7,
    GUNS: weaponMirror([
        {
            POSITION: {
                LENGTH: 10,
                WIDTH: 3.5,
                Y: 8.25,
                ANGLE: 18
            }
        },
        {
            POSITION: {
                LENGTH: 14,
                WIDTH: 3.5,
                Y: 4.75,
                ANGLE: 18
            }
        },
        {
            POSITION: {
                LENGTH: 16,
                WIDTH: 3.5,
                Y: 3.75
            }
        }
    ], { delayIncrement: 0.5 })
}
Class.bentMinigun_AR = {
    PARENT: "genericTank",
    LABEL: "Bent Minigun",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.2
    },
    GUNS: [
        ...weaponMirror([{
            POSITION: {
                LENGTH: 19,
                WIDTH: 8,
                X: -2,
                Y: 2,
                ANGLE: 16
            }
        },
        {
            POSITION: {
                LENGTH: 17,
                WIDTH: 8,
                X: -2,
                Y: 2,
                ANGLE: 16
            }
        }], { delayIncrement: 0.5 }),
        {
            POSITION: {
                LENGTH: 21,
                WIDTH: 8
            }
        },
        {
            POSITION: {
                LENGTH: 19,
                WIDTH: 8
            }
        },
        {
            POSITION: {
                LENGTH: 17,
                WIDTH: 8
            }
        }
    ]
}
Class.brisker_AR = {
    PARENT: "genericTank",
    LABEL: "Brisker",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        FOV: base.FOV * 1.1
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 5,
                WIDTH: 11,
                ASPECT: 1.3,
                X: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, {speed: 3}]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "drone",
                MAX_CHILDREN: 6,
                WAIT_TO_CYCLE: true
            }
        },
        {
            POSITION: {
                LENGTH: 7,
                WIDTH: 0.5,
                ASPECT: -5,
                X: 8
            }
        }
    ]
}
Class.captain_AR = {
    PARENT: "genericTank",
    LABEL: "Captain",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.1
    },
    GUNS: weaponArray([
        {
            POSITION: {
                LENGTH: 4.5,
                WIDTH: 10,
                X: 10.5,
                ANGLE: 90
            },
        },
        {
            POSITION: {
                LENGTH: 1,
                WIDTH: 12,
                X: 15,
                ANGLE: 90
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                TYPE: "minion",
                STAT_CALCULATOR: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                MAX_CHILDREN: 4,
            },
        },
        {
            POSITION: {
                LENGTH: 11.5,
                WIDTH: 12,
                ANGLE: 90
            }
        }
    ], 2)
}
Class.charger_AR = {
    PARENT: "genericTank",
    LABEL: "Charger",
    DANGER: 7,
    GUNS: [
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 12
            }
        },
        {
            POSITION: {
                LENGTH: 2,
                WIDTH: 12,
                ASPECT: 1.1,
                X: 18
            }
        },
        {
            POSITION: {
                LENGTH: 2,
                WIDTH: 4,
                ASPECT: 0.001,
                X: 18
            }
        }
    ]
}
Class.cluster_AR = {
    PARENT: "genericTank",
    LABEL: "Cluster",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.1
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 19.5,
                WIDTH: 16,
                ASPECT: 0.5
            }
        },
        {
            POSITION: {
                LENGTH: 17,
                WIDTH: 14,
                ASPECT: 1.2
            }
        }
    ]
}
Class.coalesce_AR = makeOver("wark_AR", "Coalesce", preset.hybrid)
Class.cobbler_AR = makeOver("mech_AR", "Cobbler", preset.hybrid)
Class.cog_AR = {
    PARENT: "genericTank",
    LABEL: "Cog",
    DANGER: 7,
    GUNS: weaponMirror([
        {
            POSITION: {
                LENGTH: 15,
                WIDTH: 8,
                Y: 4.5,
                ANGLE: 10
            }
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 11,
                Y: 4.5,
                ANGLE: 10
            }
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 8,
                ASPECT: 1.7,
                X: 15,
                Y: 4.5,
                ANGLE: 10
            }
        }
    ], { delayIncrement: 0.5 })
}
Class.cockatiel_AR = makeBird("pen_AR", "Cockatiel")
Class.combo_AR = {
    PARENT: "genericTank",
    LABEL: "Combo",
    DANGER: 7,
    GUNS: weaponArray([
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard]),
                TYPE: "bullet"
            }
        }
    ], 3),
    TURRETS: weaponArray([
        {
            POSITION: {
                SIZE: 11,
                X: 8,
                ANGLE: 180,
                ARC: 190
            },
            TYPE: "autoTankGun",
            INDEPENDENT: true,
        },
    ], 3)
}
Class.courser_AR = {
    PARENT: "genericTank",
    LABEL: "Courser",
    DANGER: 7,
    GUNS: [
        {
            POSITION: {
                LENGTH: 27,
                WIDTH: 8
            }
        },
        {
            POSITION: {
                LENGTH: 24,
                WIDTH: 11
            }
        },
        {
            POSITION: {
                LENGTH: 13,
                WIDTH: 11,
                ASPECT: -1.7
            }
        }
    ]
}
Class.crowbar_AR = {
    PARENT: "genericTank",
    LABEL: "Crowbar",
    DANGER: 7,
    BODY: {
        SPEED: 0.85 * base.SPEED,
        FOV: 1.1 * base.FOV,
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 40,
                WIDTH: 7
            }
        },
        {
            POSITION: {
                LENGTH: 15,
                WIDTH: 9,
                ASPECT: -2
            }
        }
    ],
    TURRETS: [
        {
            POSITION: {
                SIZE: 6,
                X: 19.5,
                ARC: 180,
                LAYER: 1
            },
            TYPE: [
                "crowbarTurretTank",
                { INDEPENDENT: true }
            ]
        },
        {
            POSITION: {
                SIZE: 6,
                X: 29.75,
                ARC: 180,
                LAYER: 1
            },
            TYPE: [
                "crowbarTurretTank",
                { INDEPENDENT: true }
            ]
        },
        {
            POSITION: {
                SIZE: 6,
                X: 40,
                ARC: 180,
                LAYER: 1
            },
            TYPE: [
                "crowbarTurretTank",
                { INDEPENDENT: true }
            ]
        }
    ]
}
Class.cruiserdrive_AR = makeDrive("cruiser", preset.driveSwarm)
Class.defect_AR = makeBird("tripleShot", "Defect")
Class.deviation_AR = makeOver("machineTrapper_AR", "Deviation", preset.hybrid)
Class.dieselTrapper_AR = {
    PARENT: "genericTank",
    LABEL: "Diesel Trapper",
    DANGER: 7,
    STAT_NAMES: statnames.trap,
    GUNS: [
        {
            POSITION: {
                LENGTH: 17,
                WIDTH: 11,
                ASPECT: 1.6
            }
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 18,
                ASPECT: 1.3,
                X: 17
            }
        }
    ]
}
Class.directorstorm_AR = makeDrive("director", storm_options)
Class.discharger_AR = {
    PARENT: "genericTank",
    LABEL: "Discharger",
    DANGER: 7,
    GUNS: [
        ...weaponMirror([{
            POSITION: {
                LENGTH: 15,
                WIDTH: 3.5,
                Y: -5.5,
                ANGLE: -7
            }
        },
        {
            POSITION: {
                LENGTH: 2,
                WIDTH: 3.5,
                ASPECT: 1.77,
                X: 15,
                Y: -5.5,
                ANGLE: -7
            }
        }], { delayIncrement: 0.5 }),
        {
            POSITION: {
                LENGTH: 19,
                WIDTH: 12
            }
        }
    ]
}
Class.doperdrive_AR = makeDrive("doper_AR")
Class.dopeseer_AR = {
    PARENT: "genericTank",
    LABEL: "Dopeseer",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: 0.9 * base.SPEED,
        FOV: 1.1 * base.FOV,
    },
    GUNS: weaponMirror([
        {
            POSITION: {
                LENGTH: 6,
                WIDTH: 12,
                ASPECT: 1.2,
                X: 8.,
                ANGLE: 90
            }
        },
        {
            POSITION: {
                LENGTH: 6,
                WIDTH: 1,
                ASPECT: -5,
                X: 9,
                ANGLE: 90
            }
        }
    ])
}
Class.doubleArtillery_AR = {
    PARENT: "genericTank",
    LABEL: "Double Artillery",
    DANGER: 7,
    GUNS: weaponArray([
        ...weaponMirror({
            POSITION: {
                LENGTH: 17,
                WIDTH: 5,
                Y: -5,
                ANGLE: -7,
                DELAY: 0.25
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery, g.flankGuard]),
                TYPE: "bullet",
                LABEL: "Secondary"
            }
        }, { delayIncrement: 0.5 }),
        {
            POSITION: {
                LENGTH: 19,
                WIDTH: 12
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.flankGuard]),
                TYPE: "bullet",
                LABEL: "Heavy"
            }
        }
    ], 2)
}
Class.doubleBlaster_AR = {
    PARENT: "genericTank",
    LABEL: "Double Blaster",
    DANGER: 7,
    GUNS: weaponArray({
        POSITION: {
            LENGTH: 13,
            WIDTH: 8,
            ASPECT: 1.9,
            X: 4
        },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.blaster, g.flankGuard]),
            TYPE: "bullet"
        }
    }, 2)
}
Class.doubleDiesel_AR = {
    PARENT: "genericTank",
    LABEL: "Double Diesel",
    DANGER: 7,
    GUNS: weaponArray({
        POSITION: {
            LENGTH: 14,
            WIDTH: 12,
            ASPECT: 1.6,
            X: 8,
            ANGLE: 0
        }
    }, 2)
}
Class.doubleFlankTwin_AR = {
    PARENT: "genericTank",
    LABEL: "Double Flank Twin",
    DANGER: 7,
    GUNS: weaponArray([
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 8,
                ANGLE: 90
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard]),
                TYPE: "bullet"
            }
        },
        ...weaponMirror({
            POSITION: {
                LENGTH: 20,
                WIDTH: 8,
                Y: 5.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin]),
                TYPE: "bullet"
            }
        }, { delayIncrement: 0.5 })
    ], 2)
}
Class.doubleGatling_AR = {
    PARENT: "genericTank",
    LABEL: "Double Gatling",
    DANGER: 7,
    GUNS: weaponArray({
        POSITION: {
            LENGTH: 24,
            WIDTH: 8,
            ASPECT: 1.5
        },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.focal, g.flankGuard]),
            TYPE: "bullet"
        }
    }, 2)
}
Class.doubleGunner_AR = {
    PARENT: "genericTank",
    LABEL: "Double Gunner",
    DANGER: 7,
    GUNS: weaponArray(weaponMirror([
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 3.5,
                Y: 7.25,
                DELAY: 0.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 16,
                WIDTH: 3.5,
                Y: 3.75
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        }
    ], { delayIncrement: 0.25 }), 2)
}
Class.doubleHelix_AR = {
    PARENT: "genericTank",
    LABEL: "Double Helix",
    DANGER: 7,
    STAT_NAMES: statnames.desmos,
    GUNS: weaponArray([
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 6,
                ASPECT: -1.5,
                Y: -5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.desmos]),
                TYPE: ["bullet", {CONTROLLERS: ['snake']}]
            },
        },
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 6,
                ASPECT: -1.5,
                Y: 5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.desmos]),
                TYPE: ["bullet", {CONTROLLERS: [['snake', {invert: true}]]}]
            },
        },
        {
            POSITION: {
                LENGTH: 16.5,
                WIDTH: 2,
                ASPECT: -9.25
            }
        },
        ...weaponMirror({
            POSITION: {
                LENGTH: 4,
                WIDTH: 5,
                ASPECT: -4,
                X: -9.5,
                Y: -7,
                ANGLE: 90
            }
        }, { delayIncrement: 0.5 })
    ], 2)
}
Class.doubleMinigun_AR = {
    PARENT: "genericTank",
    LABEL: "Double Minigun",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.2
    },
    GUNS: weaponArray(weaponStack({
        POSITION: {
            LENGTH: 21,
            WIDTH: 8
        },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.flankGuard]),
            TYPE: "bullet"
        }
    }, 3, { lengthOffset: 2, delayIncrement: 1/3 }), 2)
}
Class.doubleSprayer_AR = {
    PARENT: "genericTank",
    LABEL: "Double Sprayer",
    DANGER: 7,
    GUNS: weaponArray([
        {
            POSITION: {
                LENGTH: 23,
                WIDTH: 7
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.lowPower, g.pelleter, { recoil: 1.15 }, g.flankGuard]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 10,
                ASPECT: 1.4,
                X: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.flankGuard]),
                TYPE: "bullet"
            }
        }
    ], 2)
}
Class.drifter_AR = {
    PARENT: "genericSmasher",
    LABEL: "Drifter",
    DANGER: 7,
    TURRETS: [
        {
            TYPE: ["squareHat_spin", { COLOR: "black" }],
            POSITION: { SIZE: 21.5 }
        }
    ]
}
Class.encircler_AR = {
    PARENT: "genericTank",
    LABEL: "Encircler",
    DANGER: 7,
    GUNS: [
        {
            POSITION: {
                LENGTH: 21,
                WIDTH: 8
            }
        },
        {
            POSITION: {
                LENGTH: 15,
                WIDTH: 9,
                ASPECT: 1.4
            }
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 13,
                ASPECT: 1.3,
                X: 15
            }
        }
    ]
}
Class.enforcer_AR = {
    PARENT: "genericTank",
    LABEL: "Enforcer",
    DANGER: 7,
    GUNS: [
        {
            POSITION: {
                LENGTH: 23,
                WIDTH: 12
            }
        },
        {
            POSITION: {
                LENGTH: 27,
                WIDTH: 7
            }
        },
        {
            POSITION: {
                LENGTH: 13,
                WIDTH: 7,
                ASPECT: -2.2
            }
        }
    ]
}
Class.equalizer_AR = {
    PARENT: "genericTank",
    LABEL: "Equalizer",
    DANGER: 7,
    GUNS: [
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 3.5,
                Y: 7.25
            }
        },
        {
            POSITION: {
                LENGTH: 2,
                WIDTH: 3.5,
                ASPECT: 1.77,
                X: 12,
                Y: 7.25
            }
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 3.5,
                Y: -7.25
            }
        },
        {
            POSITION: {
                LENGTH: 2,
                WIDTH: 3.5,
                ASPECT: 1.77,
                X: 12,
                Y: -7.25
            }
        },
        {
            POSITION: {
                LENGTH: 16,
                WIDTH: 3.5,
                Y: 3.75
            }
        },
        {
            POSITION: {
                LENGTH: 2,
                WIDTH: 3.5,
                ASPECT: 1.77,
                X: 16,
                Y: 3.75
            }
        },
        {
            POSITION: {
                LENGTH: 16,
                WIDTH: 3.5,
                Y: -3.75
            }
        },
        {
            POSITION: {
                LENGTH: 2,
                WIDTH: 3.5,
                ASPECT: 1.77,
                X: 16,
                Y: -3.75
            }
        }
    ],
    TURRETS: []
}
Class.expeller_AR = {
    PARENT: "genericTank",
    LABEL: "Expeller",
    DANGER: 7,
    GUNS: weaponMirror([
        {
            POSITION: {
                LENGTH: 15,
                WIDTH: 8,
                ASPECT: 1.4,
                Y: 5.5,
                ANGLE: 5
            }
        },
        {
            POSITION: {
                LENGTH: 3.25,
                WIDTH: 11,
                ASPECT: 1.3,
                X: 14,
                Y: 5.5,
                ANGLE: 5
            }
        }
    ], { delayIncrement: 0.5 })
}
Class.fashioner_AR = makeOver("builder", "Fashioner", preset.hybrid)
Class.faucet_AR = {
    PARENT: "genericTank",
    LABEL: "Faucet",
    DANGER: 7,
    GUNS: [
        ...weaponMirror({
            POSITION: {
                LENGTH: 9,
                WIDTH: 8.2,
                ASPECT: 0.6,
                X: 5,
                Y: 1.5,
                ANGLE: 22.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: "swarm",
            },
        }, { delayIncrement: 0.5 }),
        {
            POSITION: {
                LENGTH: 23,
                WIDTH: 7
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.lowPower, g.pelleter, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 10,
                ASPECT: 1.4,
                X: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.foamer_AR = {
    PARENT: "genericTank",
    LABEL: "Foamer",
    DANGER: 7,
    GUNS: [
        {
            POSITION: {
                LENGTH: 25,
                WIDTH: 9
            }
        },
        {
            POSITION: {
                LENGTH: 14,
                WIDTH: 12,
                ASPECT: 1.6,
                X: 8
            }
        }
    ]
}
Class.foreman_AR = {
    PARENT: "genericTank",
    LABEL: "Foreman",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: 0.9 * base.SPEED,
        FOV: 1.1 * base.FOV,
    },
    MAX_CHILDREN: 6,
    GUNS: weaponArray({
        POSITION: {
            LENGTH: 12,
            WIDTH: 15,
            ASPECT: 1.3,
            X: 2,
            ANGLE: 90,
        }
    }, 2)
}
Class.foctillery_AR = {
    PARENT: "genericTank",
    LABEL: "Foctillery",
    DANGER: 7,
    GUNS: [
        ...weaponMirror({
            POSITION: {
                LENGTH: 17,
                WIDTH: 5,
                Y: -6,
                DELAY: 0.25
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]),
                TYPE: "bullet",
                LABEL: "Secondary"
            }
        }, { delayIncrement: 0.5 }),
        {
            POSITION: {
                LENGTH: 19,
                WIDTH: 12
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery]),
                TYPE: "bullet",
                LABEL: "Heavy"
            }
        }
    ]
}
Class.force_AR = makeOver("artillery", "Force", preset.hybrid)
Class.forger_AR = {
    PARENT: "genericTank",
    LABEL: "Forger",
    DANGER: 7,
    STAT_NAMES: statnames.mixed,
    GUNS: [
        ...weaponMirror({
            POSITION: {
                LENGTH: 17,
                WIDTH: 5,
                Y: -5,
                ANGLE: -7,
                DELAY: 0.25
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]),
                TYPE: "bullet",
                LABEL: "Secondary"
            }
        }, { delayIncrement: 0.5 }),
        {
            POSITION: {
                LENGTH: 17,
                WIDTH: 12
            }
        },
        {
            POSITION: {
                LENGTH: 2,
                WIDTH: 12,
                ASPECT: 1.1,
                X: 17
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap]),
                TYPE: "setTrap",
                STAT_CALCULATOR: "block",
                LABEL: "Heavy"
            }
        }
    ]
}
Class.foundry_AR = {
    PARENT: "genericTank",
    LABEL: "Foundry",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.1
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 15,
                WIDTH: 15
            }
        },
        {
            POSITION: {
                LENGTH: 1,
                WIDTH: 17,
                X: 15
            }
        },
        {
            POSITION: {
                LENGTH: 11.5,
                WIDTH: 17
            }
        }
    ]
}
Class.frother_AR = {
    PARENT: "genericTank",
    LABEL: "Frother",
    DANGER: 7,
    STAT_NAMES: statnames.trap,
    GUNS: [
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 5,
                ASPECT: 1.4
            }
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 7,
                ASPECT: 1.3,
                X: 18
            }
        },
        {
            POSITION: {
                LENGTH: 15,
                WIDTH: 9,
                ASPECT: 1.4
            }
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 13,
                ASPECT: 1.3,
                X: 15
            }
        }
    ]
}
Class.gator_AR = makeOver("gatlingGun", "Gator", preset.hybrid)
Class.hangar_AR = {
    PARENT: "genericTank",
    LABEL: "Hangar",
    DANGER: 7,
    FACING_TYPE: "locksFacing",
    STAT_NAMES: statnames.mixed,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.2
    },
    GUNS: [
        ...weaponMirror({
            POSITION: {
                LENGTH: 8.5,
                WIDTH: 8.2,
                ASPECT: 0.6,
                X: 3,
                Y: 5.5
            }
        }, { delayIncrement: 0.5 }),
        {
            POSITION: {
                LENGTH: 4.5,
                WIDTH: 10,
                X: 10.5
            }
        },
        {
            POSITION: {
                LENGTH: 1,
                WIDTH: 12,
                X: 15
            }
        },
        {
            POSITION: {
                LENGTH: 3.5,
                WIDTH: 12,
                X: 8
            }
        }
    ]
}
Class.heaver_AR = makeOver("launcher", "Heaver", preset.hybrid)
Class.helicopter_AR = {
    PARENT: "genericTank",
    LABEL: "Helicopter",
    ANGLE: 60,
    CONTROLLERS: ["whirlwind"],
    HAS_NO_RECOIL: true,
    STAT_NAMES: statnames.satellite,
    HEALING_TANK: true,
    TURRETS: [
        {
            TYPE: "healerHat_spin",
            POSITION: {
                SIZE: 4.5,
                LAYER: 2
            }
        },
        {
            POSITION: {
                SIZE: 8,
                LAYER: 1
            },
            TYPE: ["hexagonHat_spin", { COLOR: "grey" }]
        }
    ],
    AI: {
        SPEED: 2, 
    },
    GUNS: (() => { 
        let output = []
        for (let i = 0; i < 6; i++) { 
            output.push({ 
                POSITION: {WIDTH: 8, LENGTH: 1, DELAY: i * 0.25},
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.satellite, g.healer]), 
                    TYPE: ["healerSatellite", {ANGLE: i * 60}], 
                    MAX_CHILDREN: 1,   
                    AUTOFIRE: true,  
                    SYNCS_SKILLS: false,
                    WAIT_TO_CYCLE: true
                }
            }) 
        }
        return output
    })()
}
Class.hitman_AR = makeOver("assassin", "Hitman", preset.hybrid)
Class.honchodrive_AR = makeDrive("honcho_AR")
Class.hurler_AR = {
    PARENT: "genericTank",
    LABEL: "Hurler",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.1
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 19.2,
                WIDTH: 16,
                ASPECT: 0.7
            }
        },
        {
            POSITION: {
                LENGTH: 17,
                WIDTH: 16
            }
        }
    ]
}
Class.hutch_AR = {
    PARENT: "genericTank",
    LABEL: "Hutch",
    DANGER: 7,
    GUNS: weaponMirror([
        {
            POSITION: {
                LENGTH: 20.25,
                WIDTH: 8,
                Y: 5.5,
                ANGLE: 5
            }
        },
        {
            POSITION: {
                LENGTH: 3.25,
                WIDTH: 8,
                ASPECT: 1.7,
                X: 14,
                Y: 5.5,
                ANGLE: 5
            }
        }
    ], { delayIncrement: 0.5 })
}
Class.hybrix_AR = makeOver("helix", "Hybrix", preset.hybrid)
Class.incarcerator_AR = {
    PARENT: "genericTank",
    LABEL: "Incarcerator",
    DANGER: 7,
    GUNS: [
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 8,
                ANGLE: 180
            }
        },
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 8
            }
        },
        {
            POSITION: {
                LENGTH: 13,
                WIDTH: 8,
                ANGLE: 180
            }
        },
        {
            POSITION: {
                LENGTH: 4,
                WIDTH: 8,
                ASPECT: 1.7,
                X: 13,
                ANGLE: 180
            }
        }
    ]
}
Class.inception_AR = {
    PARENT: "genericTank",
    LABEL: "Inception",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.1
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 19.2,
                WIDTH: 13,
                ASPECT: 0.7
            }
        },
        {
            POSITION: {
                LENGTH: 17,
                WIDTH: 13
            }
        },
        {
            POSITION: {
                LENGTH: 4,
                WIDTH: 8,
                X: 13
            }
        }
    ]
}
Class.integrator_AR = makeOver("triAngle", "Integrator", preset.hybridBehind)
Class.interner_AR = makeOver("pen_AR", "Interner", preset.hybrid)
Class.issuer_AR = {
    PARENT: "genericTank",
    LABEL: "Issuer",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.1
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 4.5,
                WIDTH: 10,
                X: 10.5
            }
        },
        {
            POSITION: {
                LENGTH: 1,
                WIDTH: 12,
                X: 15
            }
        },
        {
            POSITION: {
                LENGTH: 3.5,
                WIDTH: 12,
                X: 8
            }
        },
        {
            POSITION: {
                LENGTH: 6,
                WIDTH: 1,
                ASPECT: -5,
                X: 8
            }
        }
    ]
}
Class.jalopy_AR = {
    PARENT: "genericTank",
    LABEL: "Jalopy",
    DANGER: 7,
    GUNS: [
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 12,
                ASPECT: 1.8,
                X: 6,
                ANGLE: 0
            }
        }
    ]
}
Class.junkie_AR = {
    PARENT: "genericTank",
    LABEL: "Junkie",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        FOV: base.FOV * 1.1
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 11,
                WIDTH: 14,
                ASPECT: 1.3,
                X: 2
            }
        },
        {
            POSITION: {
                LENGTH: 6,
                WIDTH: 1,
                ASPECT: -5,
                X: 8
            }
        }
    ]
}
Class.laborer_AR = {
    PARENT: "genericTank",
    LABEL: "Laborer",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.1
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 4.5,
                WIDTH: 10,
                ASPECT: 1.2,
                X: 10.5
            }
        },
        {
            POSITION: {
                LENGTH: 1,
                WIDTH: 12,
                X: 15
            }
        },
        {
            POSITION: {
                LENGTH: 5.5,
                WIDTH: 11,
                ASPECT: -1.3,
                X: 6
            }
        }
    ]
}
Class.machineGuard_AR = {
    PARENT: "genericTank",
    LABEL: "Machine Guard",
    DANGER: 7,
    GUNS: [
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 8
            }
        },
        {
            POSITION: {
                LENGTH: 15,
                WIDTH: 9,
                ASPECT: 1.4,
                ANGLE: 180
            }
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 13,
                ASPECT: 1.3,
                X: 15,
                ANGLE: 180
            }
        }
    ]
}
Class.machineMech_AR = {
    PARENT: "genericTank",
    LABEL: "Machine Mech",
    DANGER: 7,
    GUNS: [
        {
            POSITION: {
                LENGTH: 15,
                WIDTH: 9,
                ASPECT: 1.4
            }
        },
        {
            POSITION: {
                LENGTH: 11.5,
                WIDTH: 13,
                ASPECT: 1.2
            }
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 13,
                ASPECT: 1.3,
                X: 15
            }
        }
    ]
}
Class.mechGuard_AR = {
    PARENT: "genericTank",
    LABEL: "Mech Guard",
    DANGER: 7,
    GUNS: [
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 8
            }
        },
        {
            POSITION: {
                LENGTH: 15,
                WIDTH: 8,
                ANGLE: 180
            }
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 11,
                ANGLE: 180
            }
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 8,
                ASPECT: 1.7,
                X: 15,
                ANGLE: 180
            }
        }
    ]
}
Class.megaHunter_AR = {
    PARENT: "genericTank",
    LABEL: "Mega Hunter",
    DANGER: 7,
    GUNS: [
        {
            POSITION: {
                LENGTH: 24,
                WIDTH: 12
            }
        },
        {
            POSITION: {
                LENGTH: 21,
                WIDTH: 15
            }
        }
    ]
}
Class.megaSpawner_AR = {
    PARENT: "genericTank",
    LABEL: "Mega-Spawner",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.1
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 15,
                WIDTH: 13
            }
        },
        {
            POSITION: {
                LENGTH: 11.5,
                WIDTH: 15
            }
        },
        {
            POSITION: {
                LENGTH: 1,
                WIDTH: 15,
                X: 15
            },
            PROPERTIES: {
                MAX_CHILDREN: 4,
                SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory, {size: 0.8 }]),
                TYPE: "megaMinion",
                STAT_CALCULATOR: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true
            }
        }
    ]
}
Class.megaTrapper_AR = {
    PARENT: "genericTank",
    LABEL: "Mega Trapper",
    DANGER: 7,
    STAT_NAMES: statnames.trap,
    GUNS: [
        {
            POSITION: {
                LENGTH: 14,
                WIDTH: 12
            }
        },
        {
            POSITION: {
                LENGTH: 5,
                WIDTH: 12,
                ASPECT: 1.7,
                X: 13
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.megaTrapper]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap"
            }
        }
    ]
}
Class.mingler_AR = {
    PARENT: "genericTank",
    LABEL: "Mingler",
    DANGER: 7,
    GUNS: weaponArray([
        {
            POSITION: {
                LENGTH: 15,
                WIDTH: 3.5,
                ANGLE: 30,
                DELAY: 0.25
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard]),
                TYPE: "bullet"
            }
        }
    ], 6, 0.5)
}
Class.mosey_AR = {
    PARENT: "genericTank",
    LABEL: "Mosey",
    DANGER: 7,
    STAT_NAMES: statnames.swarm,
    GUNS: weaponMirror([
        {
            POSITION: {
                LENGTH: 9,
                WIDTH: 8.2,
                ASPECT: 0.6,
                X: 5,
                Y: 4
            }
        },
        {
            POSITION: {
                LENGTH: 7,
                WIDTH: 1,
                ASPECT: -2.5,
                X: 8,
                Y: 4
            }
        }
    ], { delayIncrement: 0.5 })
}
Class.nurse_AR = {
    PARENT: "genericHealer",
    LABEL: "Nurse",
    GUNS: weaponMirror([
        {
            POSITION: {
                LENGTH: 11,
                WIDTH: 8,
                ASPECT: -0.4,
                X: 9.5,
                Y: 5.5
            }
        },
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 9,
                Y: 5.5
            }
        }
    ], { delayIncrement: 0.5 })
}
Class.operator_AR = {
    PARENT: "genericTank",
    LABEL: "Operator",
    DANGER: 7,
    GUNS: [
        {
            POSITION: {
                LENGTH: 21,
                WIDTH: 8
            }
        },
        {
            POSITION: {
                LENGTH: 15,
                WIDTH: 8
            }
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 11
            }
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 8,
                ASPECT: 1.7,
                X: 15
            }
        }
    ]
}
Class.peashooter_AR = {
    PARENT: "genericTank",
    LABEL: "Peashooter",
    DANGER: 7,
    STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 7,
                WIDTH: 7.5,
                ASPECT: 0.6,
                X: 7
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: "swarm"
            }
        },
        ...preset.trapGuard
    ]
}
Class.pentaseer_AR = {
    PARENT: "genericTank",
    LABEL: "Pentaseer",
    DANGER: 7,
    NECRO: [4],
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.1,
    },
    SHAPE: 5,
    GUNS: weaponMirror({
        POSITION: {
            LENGTH: 6,
            WIDTH: 11,
            ASPECT: 1.2,
            X: 7.4,
            ANGLE: 36
        }
    })
}
Class.pitcher_AR = {
    PARENT: "genericTank",
    LABEL: "Pitcher",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.1
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 19.2,
                WIDTH: 13,
                ASPECT: 0.7
            }
        },
        {
            POSITION: {
                LENGTH: 17,
                WIDTH: 13
            }
        },
        {
            POSITION: {
                LENGTH: 13,
                WIDTH: 5,
                Y: 4
            }
        },
        {
            POSITION: {
                LENGTH: 13,
                WIDTH: 5,
                Y: -4
            }
        }
    ]
}
Class.polluter_AR = makeOver("diesel_AR", "Polluter", preset.hybrid)
Class.prober_AR = {
    PARENT: "genericTank",
    LABEL: "Prober",
    DANGER: 7,
    GUNS: [
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 12
            }
        },
        {
            POSITION: {
                LENGTH: 26,
                WIDTH: 5
            }
        },
        {
            POSITION: {
                LENGTH: 24,
                WIDTH: 7
            }
        }
    ]
}
Class.productionist_AR = {
    PARENT: "genericTank",
    LABEL: "Productionist",
    DANGER: 7,
    STAT_NAMES: statnames.swarm,
    BODY: {
        SPEED: base.SPEED * 0.75,
        FOV: 1.2,
    },
    GUNS: weaponMirror([
        {
            POSITION: {
                LENGTH: 14.5,
                WIDTH: 6,
                Y: 5.2
            }
        },
        {
            POSITION: {
                LENGTH: 11,
                WIDTH: 8,
                ASPECT: -1.2,
                Y: 5.2
            }
        },
        {
            POSITION: {
                LENGTH: 1,
                WIDTH: 8,
                X: 14.5,
                Y: 5.2
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.productionist]),
                TYPE: "tinyMinion",
                STAT_CALCULATOR: "drone",
                SYNCS_SKILLS: true
            }
        }
    ], { delayIncrement: 0.5 })
}
Class.projector_AR = {
    PARENT: "genericTank",
    LABEL: "Projector",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.1
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 17,
                WIDTH: 14,
                ASPECT: -0.5
            }
        },
        {
            POSITION: {
                LENGTH: 14,
                WIDTH: 14
            }
        },
        {
            POSITION: {
                LENGTH: 10,
                WIDTH: 10,
                ASPECT: -0.5,
                X: 9
            }
        },
        {
            POSITION: {
                LENGTH: 8,
                WIDTH: 10,
                X: 9
            }
        }
    ]
}
Class.psychiatrist_AR = {
    PARENT: "genericHealer",
    LABEL: "Psychiatrist",
    GUNS: [
        {
            POSITION: {
                LENGTH: 11,
                WIDTH: 9,
                ASPECT: -0.4,
                X: 9.5
            }
        },
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 10,
                ASPECT: 1.3
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.healer]),
                TYPE: "healerBullet"
            }
        }
    ]
}
Class.quadAngle_AR = {
    PARENT: "genericTank",
    LABEL: "Quad-Angle",
    DANGER: 7,
    BODY: {
        HEALTH: 0.8 * base.HEALTH,
        SHIELD: 0.8 * base.SHIELD,
        DENSITY: 0.6 * base.DENSITY,
    },
    TURRETS: [
        {
            POSITION: {
                SIZE: 8,
                X: 8,
                ANGLE: 45,
                ARC: 190
            },
            TYPE: "autoTankGun",
        },
        {
            POSITION: {
                SIZE: 8,
                X: 8,
                ANGLE: -45,
                ARC: 190
            },
            TYPE: "autoTankGun",
        },
    ],
    GUNS: weaponMirror({
        POSITION: {
            LENGTH: 16,
            WIDTH: 8,
            ANGLE: 150,
            DELAY: 0.1
        },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
            TYPE: "bullet",
            LABEL: "thruster"
        }
    })
}
Class.queller_AR = {
    PARENT: "genericTank",
    LABEL: "Queller",
    DANGER: 7,
    GUNS: [
        ...weaponMirror({
            POSITION: {
                LENGTH: 17,
                WIDTH: 5,
                Y: -6,
                ANGLE: -7,
                DELAY: 0.25
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]),
                TYPE: "bullet",
                LABEL: "Secondary"
            }
        }, { delayIncrement: 0.5 }),
        {
            POSITION: {
                LENGTH: 19,
                WIDTH: 14
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.artillery]),
                TYPE: "bullet",
                LABEL: "Heavy"
            }
        }
    ]
}
Class.railgun_AR = {
    PARENT: "genericTank",
    LABEL: "Railgun",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.2
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 7.95
            }
        },
        {
            POSITION: {
                LENGTH: 24,
                WIDTH: 5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.railgun]),
                TYPE: "bullet",
            }
        },
        {
            POSITION: {
                LENGTH: 5.5,
                WIDTH: 8,
                ASPECT: -1.8,
                X: 6.5
            }
        }
    ]
}
Class.recalibrator_AR = {
    PARENT: "genericHealer",
    LABEL: "Recalibrator",
    GUNS: [
        {
            POSITION: {
                LENGTH: 11,
                WIDTH: 7,
                ASPECT: -0.4,
                X: 11.5
            }
        },
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 8,
                ASPECT: -1.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.desmos, g.healer]),
                TYPE: ["healerBullet", {CONTROLLERS: ['snake']}]
            }
        },
        ...weaponMirror({
            POSITION: {
                LENGTH: 5,
                WIDTH: 5,
                ASPECT: -4,
                X: -5.25,
                Y: -7,
                ANGLE: 90
            }
        }, { delayIncrement: 0.5 })
    ]
}
Class.rimfire_AR = {
    PARENT: "genericTank",
    LABEL: "Rimfire",
    DANGER: 7,
    GUNS: [
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 2,
                X: 2,
                Y: -2.5
            }
        },
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 2,
                X: 2,
                Y: 2.5
            }
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 7,
                Y: 5
            }
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 7,
                Y: -5
            }
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 10,
                X: 2
            }
        }
    ]
}
Class.rocketeer_AR = {
    PARENT: "genericTank",
    LABEL: "Rocketeer",
    DANGER: 7,
    BODY: {
        FOV: 1.15 * base.FOV
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 19,
                WIDTH: 7.73,
                ASPECT: 1.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.launcher, g.rocketeer]),
                TYPE: "rocketeerMissile",
                STAT_CALCULATOR: "sustained",
            }
        },
        {
            POSITION: {
                LENGTH: 16,
                WIDTH: 11,
                ASPECT: -1.5
            }
        }
    ]
}
Class.rotaryGun_AR = {
    PARENT: "genericTank",
    LABEL: "Rotary Gun",
    DANGER: 7,
    GUNS: [
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 9.5,
                ASPECT: 1.25,
                X: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.focal, g.focal]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.scientist_AR = {
    PARENT: "genericHealer",
    LABEL: "Scientist",
    STAT_NAMES: statnames.trap,
    GUNS: [
        {
            POSITION: {
                LENGTH: 16,
                WIDTH: 7
            }
        },
        {
            POSITION: {
                LENGTH: 13.5,
                WIDTH: 8
            }
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 7,
                ASPECT: 1.5,
                X: 16
            }
        }
    ]
}
Class.shower_AR = makeOver("sprayer", "Shower", preset.hybrid)
Class.slinker_AR = {
    PARENT: "genericTank",
    LABEL: "Slinker",
    DANGER: 7,
    INVISIBLE: [0.08, 0.03],
    TOOLTIP: "Stay still to turn invisible.",
    GUNS: [
        {
            POSITION: {
                LENGTH: 20.5,
                WIDTH: 14,
                ASPECT: -1.2
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.sniper3_AR = makeRadialAuto("sniper3gun", {isTurret: true, danger: 7, size: 13, label: "Sniper-3", body: {SPEED: 0.8 * base.SPEED, FOV: 1.25 * base.FOV}})
Class.soother_AR = {
    PARENT: "genericHealer",
    LABEL: "Soother",
    STAT_NAMES: statnames.drone,
    GUNS: [
        {
            POSITION: {
                LENGTH: 5,
                WIDTH: 10,
                ASPECT: 1.3,
                X: 8
            }
        }
    ]
}
Class.spawnerdrive_AR = makeDrive("spawner")
Class.splitShot_AR = {
    PARENT: "genericTank",
    LABEL: "Split Shot",
    DANGER: 7,
    GUNS: [
        ...weaponMirror([{
            POSITION: {
                LENGTH: 11,
                WIDTH: 8,
                X: 8,
                Y: 2,
                ANGLE: 18
            }
        },
        {
            POSITION: {
                LENGTH: 16,
                WIDTH: 3.5,
                X: 4,
                Y: 0.5,
                ANGLE: 15
            }
        }], { delayIncrement: 0.5 }),
        {
            POSITION: {
                LENGTH: 22,
                WIDTH: 8
            }
        }
    ]
}
Class.stall_AR = {
    PARENT: "genericTank",
    LABEL: "Stall",
    DANGER: 7,
    GUNS: [
        {
            POSITION: {
                LENGTH: 23,
                WIDTH: 8
            }
        },
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 12
            }
        },
        {
            POSITION: {
                LENGTH: 2,
                WIDTH: 12,
                ASPECT: 1.1,
                X: 18
            }
        }
    ]
}
Class.stormer_AR = {
    PARENT: "genericTank",
    LABEL: "Stormer",
    DANGER: 7,
    GUNS: [
        ...weaponMirror({
            POSITION: {
                LENGTH: 30,
                WIDTH: 2,
                Y: -2.5,
                ANGLE: 0.25
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, { speed: 0.7, maxSpeed: 0.7 }, g.flankGuard, { recoil: 1.8 }]),
                TYPE: "bullet",
            },
        }, { delayIncrement: 0.5 }),
        {
            POSITION: {
                LENGTH: 24,
                WIDTH: 10
            }
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 10,
                ASPECT: 1.4,
                X: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.triHealer_AR = {
    PARENT: "genericHealer",
    LABEL: "Tri-Healer",
    GUNS: weaponArray([
        {
            POSITION: {
                LENGTH: 11,
                WIDTH: 9,
                ASPECT: -0.4,
                X: 9.5
            }
        },
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 10
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.healer]),
                TYPE: "healerBullet"
            }
        }
    ], 3)
}
Class.triMachine_AR = {
    PARENT: "genericTank",
    LABEL: "Tri-Machine",
    DANGER: 7,
    STAT_NAMES: statnames.trap,
    GUNS: weaponArray([
        {
            POSITION: {
                LENGTH: 15,
                WIDTH: 9,
                ASPECT: 1.4
            }
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 13,
                ASPECT: 1.3,
                X: 15,
                ANGLE: 0
            }
        }
    ], 3)
}
Class.triMech_AR = {
    PARENT: "genericTank",
    LABEL: "Tri-Mech",
    DANGER: 7,
    STAT_NAMES: statnames.trap,
    GUNS: weaponArray([
        {
            POSITION: {
                LENGTH: 15,
                WIDTH: 8
            }
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 11
            }
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 8,
                ASPECT: 1.7,
                X: 15
            }
        }
    ], 3)
}
Class.triPen_AR = {
    PARENT: "genericTank",
    LABEL: "Tri-Pen",
    DANGER: 7,
    STAT_NAMES: statnames.trap,
    GUNS: weaponArray([
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 8
            }
        },
        {
            POSITION: {
                LENGTH: 4,
                WIDTH: 8,
                ASPECT: 1.7,
                X: 13
            }
        }
    ], 3)
}
Class.triTrapGuard_AR = {
    PARENT: "genericTank",
    LABEL: "Tri-Trap Guard",
    DANGER: 7,
    STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard]),
                TYPE: "bullet"
            }
        },
        ...weaponMirror([{
            POSITION: {
                LENGTH: 13,
                WIDTH: 8,
                ANGLE: 90
            }
        },
        {
            POSITION: {
                LENGTH: 4,
                WIDTH: 8,
                ASPECT: 1.7,
                X: 13,
                ANGLE: 90
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            }
        }]),
        ...preset.trapGuard
    ]
}
Class.underdrive_AR = makeDrive("underseer", {label: "Underdrive"})
Class.volley_AR = {
    PARENT: "genericTank",
    LABEL: "Volley",
    DANGER: 7,
    GUNS: [
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 5,
                Y: 7.25
            }
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 5,
                Y: -7.25
            }
        },
        {
            POSITION: {
                LENGTH: 16,
                WIDTH: 5,
                Y: 3.75
            }
        },
        {
            POSITION: {
                LENGTH: 16,
                WIDTH: 5,
                Y: -3.75
            }
        }
    ]
}
Class.waarrk_AR = {
    PARENT: "genericTank",
    LABEL: "Waarrk",
    DANGER: 7,
    GUNS: [
        ...weaponMirror([{
            POSITION: {
                LENGTH: 16,
                WIDTH: 8,
                Y: 2,
                ANGLE: 18
            }
        },
        {
            POSITION: {
                LENGTH: 3.25,
                WIDTH: 8,
                ASPECT: 1.7,
                X: 15,
                Y: 2,
                ANGLE: 18
            }
        }], { delayIncrement: 0.5 }),
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 8
            }
        },
        {
            POSITION: {
                LENGTH: 3.25,
                WIDTH: 8,
                ASPECT: 1.7,
                X: 17
            }
        }
    ],
    TURRETS: []
}
Class.warkwark_AR = {
    PARENT: "genericTank",
    LABEL: "Warkwark",
    DANGER: 7,
    STAT_NAMES: statnames.trap,
    GUNS: weaponArray(weaponMirror([
        {
            POSITION: {
                LENGTH: 15,
                WIDTH: 8,
                Y: 5.5,
                ANGLE: 5
            }
        },
        {
            POSITION: {
                LENGTH: 3.25,
                WIDTH: 8,
                ASPECT: 1.7,
                X: 14,
                Y: 5.5,
                ANGLE: 5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.doubleTwin]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap"
            }
        }
    ], { delayIncrement: 0.5 }), 2)
}
Class.widget_AR = {
    PARENT: "genericTank",
    LABEL: "Widget",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.2
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 21,
                WIDTH: 8,
                ASPECT: 1.4
            }
        },
        {
            POSITION: {
                LENGTH: 19,
                WIDTH: 8,
                ASPECT: 1.4
            }
        },
        {
            POSITION: {
                LENGTH: 17,
                WIDTH: 8,
                ASPECT: 1.4
            }
        }
    ]
}
Class.zipper_AR = {
    PARENT: "genericTank",
    LABEL: "Zipper",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.2
    },
    GUNS: [
        ...weaponMirror({
            POSITION: {
                LENGTH: 9,
                WIDTH: 8.2,
                ASPECT: 0.6,
                X: 5,
                Y: 1.5,
                ANGLE: 22.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: "swarm",
            },
        }, { delayIncrement: 0.5 }),
        {
            POSITION: {
                LENGTH: 21,
                WIDTH: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 19,
                WIDTH: 8,
                DELAY: 1/3
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 17,
                WIDTH: 8,
                DELAY: 2/3
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun]),
                TYPE: "bullet"
            }
        }
    ]
}

// Tier 4
Class.PLACEHOLDER_healerOverseer_AR = {
    PARENT: "genericHealer",
    LABEL: "",
    STAT_NAMES: statnames.drone,
    GUNS: weaponArray({
        POSITION: {
            LENGTH: 6,
            WIDTH: 12,
            ASPECT: 1.2,
            X: 8,
            ANGLE: 90
        }
    }, 2)
}
Class.PLACEHOLDER_healerSprayer_AR = {
    PARENT: "genericHealer",
    LABEL: "",
    GUNS: [
        {
            POSITION: {
                LENGTH: 11,
                WIDTH: 6,
                ASPECT: -0.4,
                X: 14.5
            }
        },
        {
            POSITION: {
                LENGTH: 23,
                WIDTH: 7
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.lowPower, g.pelleter, { recoil: 1.15 }, g.healer]),
                TYPE: "healerBullet"
            }
        },
        {
            POSITION: {
                LENGTH: 11,
                WIDTH: 9,
                ASPECT: -0.4,
                X: 9.5
            }
        },
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 10,
                ASPECT: 1.3
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.healer]),
                TYPE: "healerBullet"
            }
        }
    ]
}
Class.PLACEHOLDER_healerUnderseer_AR = {
    PARENT: "genericHealer",
    LABEL: "",
    NECRO: [4],
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.1,
    },
    SHAPE: 4,
    MAX_CHILDREN: 14,
    GUNS: weaponArray({
        POSITION: {
            LENGTH: 6,
            WIDTH: 12,
            ASPECT: 1.2,
            X: 7.4,
            ANGLE: 90
        }
    }, 2)
}
Class.PLACEHOLDER_whirlBanshee_AR = makeWhirlwind("banshee", {label: ""})
Class.PLACEHOLDER_whirlBeekeeper_AR = makeWhirlwind("beekeeper", {label: ""})
Class.PLACEHOLDER_whirlCyclone_AR = makeWhirlwind("cyclone", {label: ""})
Class.PLACEHOLDER_whirlDischarger_AR = makeWhirlwind("discharger_AR", {label: ""})
Class.PLACEHOLDER_whirlFieldGun_AR = makeWhirlwind("fieldGun", {label: ""})
Class.PLACEHOLDER_whirlFoctillery_AR = makeWhirlwind("foctillery_AR", {label: ""})
Class.PLACEHOLDER_whirlForger_AR = makeWhirlwind("forger_AR", {label: ""})
Class.PLACEHOLDER_whirlHexaTrapper_AR = makeWhirlwind(makeAuto({
    PARENT: "genericTank",
    DANGER: 7,
    BODY: {
        SPEED: 0.8 * base.SPEED
    },
    STAT_NAMES: statnames.trap,
    HAS_NO_RECOIL: true,
    GUNS: weaponArray([
        {
            POSITION: {
                LENGTH: 15,
                WIDTH: 7
            }
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 7,
                ASPECT: 1.7,
                X: 15
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexaTrapper]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap"
            }
        }
    ], 6, 0.5),
}, "", whirlAuto_options), {label: ""})
Class.PLACEHOLDER_whirlInfestor_AR = makeWhirlwind("infestor", {label: ""})
Class.PLACEHOLDER_whirlMaleficitor_AR = makeWhirlwind("maleficitor", {...preset.prophet, label: ""})
Class.PLACEHOLDER_whirlMingler_AR = makeWhirlwind("mingler_AR", {label: ""})
Class.PLACEHOLDER_whirlMortar_AR = makeWhirlwind("mortar", {label: ""})
Class.PLACEHOLDER_whirlNecromancer_AR = makeWhirlwind("necromancer", {...preset.prophet, label: ""})
Class.PLACEHOLDER_whirlOrdnance_AR = makeWhirlwind("ordnance", {label: ""})
Class.PLACEHOLDER_whirlQueller_AR = makeWhirlwind("queller_AR", {label: ""})
Class.PLACEHOLDER_whirlSniper3_AR = makeWhirlwind("sniper3_AR", {label: ""})
Class.accountant_AR = {
    PARENT: "genericHealer",
    LABEL: "Accountant",
    GUNS: [
        {
            POSITION: {
                LENGTH: 11,
                WIDTH: 14,
                ASPECT: -0.4,
                X: 9.5
            }
        },
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 15
            }
        }
    ]
}
Class.accugator_AR = makeOver("accurator", "Accugator", preset.hybrid)
Class.actuary_AR = {
    PARENT: "genericHealer",
    LABEL: "Actuary",
    GUNS: [
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 7,
                ASPECT: -0.4,
                X: 9.5
            }
        },
        {
            POSITION: {
                LENGTH: 16,
                WIDTH: 7,
                ASPECT: -0.4,
                X: 9.5
            }
        },
        {
            POSITION: {
                LENGTH: 14,
                WIDTH: 7,
                ASPECT: -0.4,
                X: 9.5
            }
        },
        {
            POSITION: {
                LENGTH: 21,
                WIDTH: 8
            }
        },
        {
            POSITION: {
                LENGTH: 19,
                WIDTH: 8
            }
        },
        {
            POSITION: {
                LENGTH: 17,
                WIDTH: 8
            }
        }
    ]
}
Class.adderall_AR = {
    PARENT: "genericTank",
    LABEL: "Adderall",
    DANGER: 8,
    STAT_NAMES: statnames.drone,
    BODY: {
        FOV: base.FOV * 1.1
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 5,
                WIDTH: 11,
                ASPECT: 1.3,
                X: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, {speed: 3}]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "drone",
                MAX_CHILDREN: 6,
                WAIT_TO_CYCLE: true
            }
        },
        {
            POSITION: {
                LENGTH: 8,
                WIDTH: 0.25,
                ASPECT: -5,
                X: 8
            }
        }
    ]
}
Class.antidote_AR = {
    PARENT: "genericHealer",
    LABEL: "Antidote",
    STAT_NAMES: statnames.swarm,
    GUNS: weaponMirror([
        {
            POSITION: {
                LENGTH: 6.5,
                WIDTH: 5.2,
                ASPECT: -0.4,
                X: 9.5,
                Y: 4
            }
        },
        {
            POSITION: {
                LENGTH: 9,
                WIDTH: 8.2,
                ASPECT: 0.6,
                X: 5,
                Y: 4
            }
        }
    ], { delayIncrement: 0.5 })
}
Class.assistant_AR = makeOver("single", "Assistant", preset.hybrid)
Class.autoAccurator_AR = makeAuto("accurator")
Class.autoAtomizer_AR = makeAuto("atomizer")
Class.autoBentDouble_AR = makeAuto("bentDouble", "Auto-Bent Double")
Class.autoBentHybrid_AR = makeAuto("bentHybrid", "Auto-Bent Hybrid")
Class.autoCoil_AR = makeAuto("coil")
Class.autoDeadeye_AR = makeAuto("deadeye")
Class.autoDefect_AR = makeAuto("defect_AR")
Class.autoDirectorstorm_AR = makeAuto("directorstorm_AR", "Auto-Directorstorm", stormAuto_options)
Class.autoDoubleArtillery_AR = makeAuto("doubleArtillery_AR")
Class.autoDoubleBlaster_AR = makeAuto("doubleBlaster_AR")
Class.autoDoubleDiesel_AR = makeAuto("doubleDiesel_AR")
Class.autoDoubleFlank_AR = makeAuto("doubleFlankTwin_AR", "Auto-Double Flank")
Class.autoDoubleGatling_AR = makeAuto("doubleGatling_AR")
Class.autoDoubleGunner_AR = makeAuto("doubleGunner_AR")
Class.autoDoubleHelix_AR = makeAuto("doubleHelix_AR")
Class.autoDoubleMinigun_AR = makeAuto("doubleMinigun_AR")
Class.autoDoubleSprayer_AR = makeAuto("doubleSprayer_AR")
Class.autoDuplicator_AR = makeAuto("duplicator")
Class.autoFaucet_AR = makeAuto("faucet_AR")
Class.autoFoamer_AR = makeAuto("foamer_AR")
Class.autoFocal_AR = makeAuto("focal")
Class.autoFork_AR = makeAuto("fork")
Class.autoFrother_AR = makeAuto("frother_AR")
Class.autoHalfNHalf_AR = makeAuto("halfNHalf")
Class.autoHexaWhirl_AR = makeWhirlwind(makeAuto("hexaTank", "", whirlAuto_options), {label: "Auto-Hexa Whirl"})
Class.autoHewnDouble_AR = makeAuto("hewnDouble", "Auto-Hewn Double")
Class.autoIterator_AR = makeAuto("iterator")
Class.autoManager_AR = makeAuto("manager")
Class.autoMunition_AR = makeWhirlwind(makeAuto("artillery", "", whirlAuto_options), {label: "Auto-Munition"})
Class.autoNimrod_AR = makeAuto("nimrod")
Class.autoOverdrive_AR = makeAuto("overdrive", "Auto-Overdrive", driveAuto_options)
Class.autoOvergunner_AR = makeAuto("overgunner")
Class.autoOvertrapper_AR = makeAuto("overtrapper")
Class.autoPhoenix_AR = makeAuto("phoenix")
Class.autoProphet_AR = makeWhirlwind(makeAuto("underseer", "", whirlAuto_options), {label: "Auto-Prophet"})
Class.autoQuadruplex_AR = makeAuto("quadruplex")
Class.autoRedistributor_AR = makeAuto("redistributor")
Class.autoRevolver_AR = makeAuto("revolver")
Class.autoShower_AR = makeAuto("shower_AR")
Class.autoSingle_AR = makeAuto("single")
Class.autoSplasher_AR = makeAuto("splasher")
Class.autoStormer_AR = makeAuto("stormer_AR")
Class.autoSuperSpiral_AR = makeAuto("superSpiral")
Class.autoTriBlaster_AR = makeAuto("triBlaster")
Class.autoTriple_AR = makeAuto("tripleTwin", "Auto-Triple")
Class.autoTripleMachine_AR = makeAuto("tripleMachine")
Class.autoTriplex_AR = makeAuto("triplex")
Class.autoUnderdrive_AR = makeAuto("underdrive_AR", "Auto-Underdrive", driveAuto_options)
Class.autoVortex_AR = makeWhirlwind(makeAuto("launcher", "", whirlAuto_options), {label: "Auto-Vortex"})
Class.autoWarkwark_AR = makeAuto("warkwark_AR")
Class.autoWhirl3_AR = makeWhirlwind(makeAuto("auto3", "", whirlAuto_options), {label: "Auto-Whirl-3"})
Class.autoWhirlGuard_AR = makeWhirlwind(makeAuto("trapGuard", "", whirlAuto_options), {label: "Auto-Whirl Guard"})
Class.avian_AR = makeBird("single", "Avian")
Class.bansheedrive_AR = makeDrive("banshee")
Class.battledrive_AR = makeDrive("battleship", {...preset.driveSwarm, label: "Battledrive"})
Class.bentCatcher_AR = makeOver("waarrk_AR", "Bent Catcher", preset.hybrid)
Class.bentTriple_AR = {
    PARENT: "genericTank",
    LABEL: "Bent Triple",
    DANGER: 8,
    GUNS: weaponArray([
        ...weaponMirror({
            POSITION: {
                LENGTH: 19,
                WIDTH: 8,
                Y: 2,
                ANGLE: 18,
                DELAY: 0.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.spam, g.doubleTwin, g.tripleTwin]),
                TYPE: "bullet"
            }
        }),
        {
            POSITION: {
                LENGTH: 22,
                WIDTH: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.spam, g.doubleTwin, g.tripleTwin]),
                TYPE: "bullet"
            }
        }
    ], 3)
}
Class.bozo_AR = makeBird("spreadshot", "Bozo")
Class.bruiser_AR = {
    PARENT: "genericTank",
    LABEL: "Bruiser",
    DANGER: 8,
    GUNS: [
        {
            POSITION: {
                LENGTH: 21.5,
                WIDTH: 12
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.single]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 12,
                ASPECT: -1.6
            }
        }
    ]
}
Class.butcher_AR = {
    LABEL: "Butcher",
    DANGER: 8,
    BODY: {
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.25
    },
    CONTROLLERS: ["zoom"],
    TOOLTIP: "Hold right click to zoom.",
    GUNS: [
        {
            POSITION: {
                LENGTH: 24,
                WIDTH: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunterSecondary]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 21,
                WIDTH: 11,
                DELAY: 0.25
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                TYPE: "bullet"
            }
        },
        ...preset.trapGuard
    ]
}
Class.carrierdrive_AR = makeDrive("carrier", preset.driveSwarm)
Class.captaindrive_AR = makeDrive("captain_AR")
Class.chemist_AR = {
    PARENT: "genericHealer",
    LABEL: "Chemist",
    STAT_NAMES: statnames.trap,
    GUNS: weaponArray([
        {
            POSITION: {
                LENGTH: 16,
                WIDTH: 7
            }
        },
        {
            POSITION: {
                LENGTH: 13.5,
                WIDTH: 8
            }
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 7,
                ASPECT: 1.5,
                X: 16
            }
        }
    ], 3)
}
Class.clerk_AR = {
    PARENT: "genericHealer",
    LABEL: "Clerk",
    GUNS: [
        {
            POSITION: {
                LENGTH: 19.2,
                WIDTH: 12,
                ASPECT: 0.7
            }
        },
        {
            POSITION: {
                LENGTH: 17,
                WIDTH: 12
            }
        }
    ]
}
Class.clinician_AR = {
    PARENT: "genericHealer",
    LABEL: "Clinician",
    GUNS: weaponArray(weaponMirror([
        {
            POSITION: {
                LENGTH: 11,
                WIDTH: 8,
                ASPECT: -0.4,
                X: 9.5,
                Y: 5.5
            }
        },
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 9,
                Y: 5.5
            }
        }
    ], { delayIncrement: 0.5 }), 2)
}
Class.comboWhirl_AR = makeWhirlwind("combo_AR", {label: "Combo Whirl"})
Class.concentrator_AR = {
    PARENT: "genericTank",
    LABEL: "Concentrator",
    DANGER: 8,
    GUNS: [
        {
            POSITION: {
                LENGTH: 29,
                WIDTH: 7
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.lowPower, g.machineGun, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 9.5,
                ASPECT: 1.25,
                X: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.focal, g.focal]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.coordinator_AR = {
    PARENT: "genericTank",
    LABEL: "Coordinator",
    DANGER: 8,
    STAT_NAMES: statnames.drone,
    BODY: {
        FOV: base.FOV * 1.1
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 7,
                WIDTH: 12,
                ASPECT: 1.2,
                X: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.single]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "drone",
                MAX_CHILDREN: 6,
                WAIT_TO_CYCLE: true
            }
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 13.5,
                ASPECT: -1.45
            }
        }
    ]
}
Class.cruiserstorm_AR = makeDrive("cruiser", cruiserstorm_options)
Class.cyclops_AR = {
    PARENT: "genericTank",
    LABEL: "Cyclops",
    DANGER: 8,
    GUNS: [
        ...weaponStack({
            POSITION: {
                LENGTH: 13,
                WIDTH: 5,
                ASPECT: 2.2,
                X: 4
            }
        }, 2, { xPosOffset: 5 }),
        {
            POSITION: {
                LENGTH: 19,
                WIDTH: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.single, g.marksman]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 5.5,
                WIDTH: 8,
                ASPECT: -1.8,
                X: 6.5
            }
        }
    ]
}
Class.deficiency_AR = makeBird("pentaShot", "Deficiency")
Class.doctor_AR = {
    PARENT: "genericHealer",
    LABEL: "Doctor",
    STAT_NAMES: statnames.drone,
    GUNS: [
        {
            POSITION: {
                LENGTH: 13,
                WIDTH: 14,
                ASPECT: 1.3,
                X: 2
            }
        }
    ]
}
Class.donkey_AR = makeBird("bentGunner_AR", "Donkey")
Class.dopedrive_AR = makeDrive("dopeseer_AR", {label: "Dopedrive"})
Class.doperstorm_AR = makeDrive("doper_AR", storm_options)
Class.dork_AR = makeBird("splitShot_AR", "Dork")
Class.doubleAtomizer_AR = {
    PARENT: "genericTank",
    LABEL: "Double Atomizer",
    DANGER: 8,
    GUNS: weaponArray([
        {
            POSITION: {
                LENGTH: 6,
                WIDTH: 7,
                ASPECT: 1.4,
                X: 18
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.lowPower, g.machineGun, { recoil: 1.15 }, g.atomizer, g.flankGuard]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 10,
                ASPECT: 1.4,
                X: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.flankGuard]),
                TYPE: "bullet"
            }
        }
    ], 2)
}
Class.doubleCoil_AR = {
    PARENT: "genericTank",
    LABEL: "Double Coil",
    DANGER: 8,
    STAT_NAMES: statnames.desmos,
    UPGRADE_TOOLTIP: "[DEV NOTE] This tank does not function as intended yet!",
    GUNS: weaponArray([
        {
            POSITION: [20, 8, 0.75, 0, -5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.desmos]),
                TYPE: ["bullet", {CONTROLLERS: [["snake", {invert: false}]]}]
            },
        },
        {
            POSITION: [20, 8, 0.75, 0, 5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.desmos]),
                TYPE: ["bullet", {CONTROLLERS: [["snake", {invert: true}]]}]
            },
        },
        ...weaponMirror([{
            POSITION: [21, 4, 0.75, 0, 5, 0, 0]
        },
        {
            POSITION: [3.625, 7.5, 2.75, 5.75, 6.75, -90, 0],
        }]),
        {
            POSITION: [6, 8, 0.25, 10.5, 0, 0, 0],
        }
    ], 2)
}
Class.doubleDuplicator_AR = {
    PARENT: "genericTank",
    LABEL: "Double Duplicator",
    DANGER: 8,
    STAT_NAMES: statnames.desmos,
    GUNS: weaponArray([
        {
            POSITION: [20, 8, -1.5, 0, 0, 20, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.desmos]),
                TYPE: ["splitterBullet", {CONTROLLERS: [["snake", {invert: false}]]}]
            }
        },
        {
            POSITION: [20, 8, -1.5, 0, 0, -20, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.desmos]),
                TYPE: ["splitterBullet", {CONTROLLERS: [["snake", {invert: true}]]}]
            }
        },
        ...weaponMirror([{
            POSITION: [5.625, 9.5, 2, 0.375-1, -8, 111.5, 0]
        },
        {
            POSITION: [3.75, 10, 2.125, 0, 4.75, -30, 0]
        }]),
        {
            POSITION: [17, 8, 0.65, 0, 0, 0, 0]
        },
        {
            POSITION: [18, 8, 0.25, 0, 0, 0, 0]
        },
    ], 2)
}
Class.doubleFaucet_AR = {
    PARENT: "genericTank",
    LABEL: "Double Faucet",
    DANGER: 8,
    GUNS: weaponArray([
        ...weaponMirror({
            POSITION: {
                LENGTH: 9,
                WIDTH: 8.2,
                ASPECT: 0.6,
                X: 5,
                Y: 1.5,
                ANGLE: 22.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: "swarm",
            },
        }, { delayIncrement: 0.5 }),
        {
            POSITION: {
                LENGTH: 23,
                WIDTH: 7
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.lowPower, g.pelleter, { recoil: 1.15 }, g.flankGuard]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 10,
                ASPECT: 1.4,
                X: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.flankGuard]),
                TYPE: "bullet"
            }
        }
    ], 2)
}
Class.doubleFocal_AR = {
    PARENT: "genericTank",
    LABEL: "Double Focal",
    DANGER: 8,
    GUNS: weaponArray([
        {
            POSITION: {
                LENGTH: 25,
                WIDTH: 7
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.lowPower, g.machineGun, { recoil: 1.15 }, g.flankGuard]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 14,
                WIDTH: 9.5,
                ASPECT: 1.25,
                X: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.focal, g.flankGuard]),
                TYPE: "bullet"
            }
        }
    ], 2)
}
Class.doubleFoamer_AR = {
    PARENT: "genericTank",
    LABEL: "Double Foamer",
    DANGER: 8,
    GUNS: weaponArray([
        {
            POSITION: {
                LENGTH: 25,
                WIDTH: 9
            }
        },
        {
            POSITION: {
                LENGTH: 14,
                WIDTH: 12,
                ASPECT: 1.6,
                X: 8
            }
        }
    ], 2)
}
Class.doubleFrother_AR = {
    PARENT: "genericTank",
    LABEL: "Double Frother",
    DANGER: 8,
    STAT_NAMES: statnames.trap,
    GUNS: weaponArray([
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 5,
                ASPECT: 1.4
            }
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 7,
                ASPECT: 1.3,
                X: 18
            }
        },
        {
            POSITION: {
                LENGTH: 15,
                WIDTH: 9,
                ASPECT: 1.4
            }
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 13,
                ASPECT: 1.3,
                X: 15
            }
        }
    ], 2)
}
Class.doubleMunition_AR = makeWhirlwind("doubleArtillery_AR", {label: "Double Munition"})
Class.doubleRedistributor_AR = {
    PARENT: "genericTank",
    LABEL: "Double Redistributor",
    DANGER: 8,
    GUNS: weaponArray([
        {
            POSITION: {
                LENGTH: 26,
                WIDTH: 7
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.lowPower, g.machineGun, { recoil: 1.15 }, g.flankGuard]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 23,
                WIDTH: 10,
                DELAY: 0.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.lowPower, g.machineGun, { recoil: 1.15 }, g.flankGuard]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 10,
                ASPECT: 1.4,
                X: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.flankGuard]),
                TYPE: "bullet"
            }
        }
    ], 2)
}
Class.doubleStormer_AR = {
    PARENT: "genericTank",
    LABEL: "Double Stormer",
    DANGER: 8,
    GUNS: weaponArray([
        ...weaponMirror({
            POSITION: {
                LENGTH: 30,
                WIDTH: 2,
                Y: -2.5,
                ANGLE: 0.25
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, { speed: 0.7, maxSpeed: 0.7 }, g.flankGuard, { recoil: 1.8 }, g.flankGuard]),
                TYPE: "bullet",
            },
        }, { delayIncrement: 0.5 }),
        {
            POSITION: {
                LENGTH: 24,
                WIDTH: 10
            }
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 10,
                ASPECT: 1.4,
                X: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.flankGuard]),
                TYPE: "bullet"
            }
        }
    ], 2)
}
Class.doubleTriBlaster_AR = {
    PARENT: "genericTank",
    LABEL: "Double Tri-Blaster",
    DANGER: 8,
    GUNS: weaponArray([
        ...weaponMirror({
            POSITION: {
                LENGTH: 13,
                WIDTH: 8,
                ASPECT: 1.7,
                X: 4,
                Y: 2,
                ANGLE: 15,
                DELAY: 0.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.blaster, { recoil: 0.5 }, g.lowPower, g.doubleTwin]),
                TYPE: "bullet"
            }
        }),
        {
            POSITION: {
                LENGTH: 13,
                WIDTH: 8,
                ASPECT: 1.9,
                X: 6
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.blaster, { recoil: 0.5 }, g.doubleTwin]),
                TYPE: "bullet"
            }
        }
    ], 2)
}
Class.doubleTriplet_AR = {
    PARENT: "genericTank",
    LABEL: "Double Triplet",
    DANGER: 8,
    BODY: {
        FOV: 1.05 * base.FOV
    },
    GUNS: weaponArray([
        ...weaponMirror({
            POSITION: {
                LENGTH: 17.5,
                WIDTH: 8,
                Y: 5.5,
                DELAY: 0.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.triplet]),
                TYPE: "bullet"
            }
        }),
        {
            POSITION: {
                LENGTH: 21,
                WIDTH: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.triplet]),
                TYPE: "bullet"
            }
        }
    ], 2)
}
Class.doubleTriplex_AR = {
    PARENT: "genericTank",
    LABEL: "Double Triplex",
    DANGER: 8,
    STAT_NAMES: statnames.desmos,
    GUNS: weaponArray([
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 7,
                ASPECT: -1.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.tripleShot, {speed: 1.25, maxSpeed: 1.25}]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 7,
                ASPECT: -1.5,
                ANGLE: 45,
                DELAY: 0.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.tripleShot, g.desmos]),
                TYPE: ["bullet", {CONTROLLERS: ['snake']}]
            },
        },
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 7,
                ASPECT: -1.5,
                ANGLE: -45,
                DELAY: 0.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.tripleShot, g.desmos]),
                TYPE: ["bullet", {CONTROLLERS: [['snake', {invert: true}]]}]
            },
        },
        ...weaponMirror([{
            POSITION: {
                LENGTH: 5,
                WIDTH: 5,
                ASPECT: -4,
                X: -4.75,
                Y: -5,
                ANGLE: 45
            }
        },
        {
            POSITION: {
                LENGTH: 15.5,
                WIDTH: 3,
                ASPECT: -4,
                ANGLE: 22.5
            }
        }], { delayIncrement: 0.5 }),
    ], 2)
}
Class.downpourer_AR = makeDrive("director", {label: "Downpourer", type: "genericEntity", size: 12, hatType: "downpourerSquare_AR"}) // fix later
Class.duo_AR = {
    PARENT: "genericTank",
    LABEL: "Duo",
    DANGER: 8,
    GUNS: [
        ...weaponMirror({
            POSITION: {
                LENGTH: 21,
                WIDTH: 8,
                Y: 5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.single]),
                TYPE: "bullet"
            }
        }, { delayIncrement: 0.5 }),
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 18,
                ASPECT: -1.1
            }
        }
    ]
}
Class.duster_AR = {
    PARENT: "genericTank",
    LABEL: "Duster",
    DANGER: 8,
    GUNS: [
        {
            POSITION: {
                LENGTH: 26,
                WIDTH: 3
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.lowPower, g.machineGun, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 23,
                WIDTH: 7
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.lowPower, g.machineGun, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 10,
                ASPECT: 1.4,
                X: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.executor_AR = {
    PARENT: "genericTank",
    LABEL: "Executor",
    DANGER: 8,
    BODY: {
        SPEED: 0.85 * base.SPEED,
        FOV: 1.4 * base.FOV
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 27,
                WIDTH: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 13,
                WIDTH: 8,
                ASPECT: -2.2
            }
        },
        ...preset.trapGuard
    ]
}
Class.fault_AR = makeBird("waarrk_AR", "Fault")
Class.flexedHybrid_AR = makeOver("pentaShot", "Flexed Hybrid", preset.hybrid)
Class.foredrive_AR = makeDrive("foreman_AR", {label: "Foredrive"})
Class.fortdrive_AR = makeDrive("fortress", {...preset.driveSwarm, label: "Fortdrive"})
Class.gadgetGun_AR = {
    PARENT: "genericTank",
    LABEL: "Gadget Gun",
    DANGER: 8,
    GUNS: [
        {
            POSITION: {
                LENGTH: 13,
                WIDTH: 10,
                ASPECT: 1.4,
                X: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, { size: 0.92 }, g.single]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 11.3,
                ASPECT: -1.6
            }
        }
    ]
}
Class.geneticist_AR = {
    PARENT: "genericHealer",
    LABEL: "Geneticist",
    GUNS: [
        ...weaponMirror({
            POSITION: {
                LENGTH: 11,
                WIDTH: 5,
                ASPECT: -0.4,
                X: 11.5,
                Y: 5
            }
        }, { delayIncrement: 0.5 }),
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 6,
                ASPECT: -1.5,
                Y: -5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.desmos, g.healer]),
                TYPE: ["healerBullet", {CONTROLLERS: ['snake']}]
            },
        },
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 6,
                ASPECT: -1.5,
                Y: 5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.desmos, g.healer]),
                TYPE: ["healerBullet", {CONTROLLERS: [['snake', {invert: true}]]}]
            },
        },
        {
            POSITION: {
                LENGTH: 16.5,
                WIDTH: 2,
                ASPECT: -9.25
            }
        },
        ...weaponMirror({
            POSITION: {
                LENGTH: 4,
                WIDTH: 5,
                ASPECT: -4,
                X: -9.5,
                Y: -7,
                ANGLE: 90
            }
        }, { delayIncrement: 0.5 })
    ]
}
Class.guru_AR = {
    PARENT: "genericHealer",
    LABEL: "Guru",
    GUNS: [
        {
            POSITION: {
                LENGTH: 10,
                WIDTH: 4,
                ASPECT: -0.4,
                X: 9.5,
                Y: -5,
                ANGLE: -7
            }
        },
        {
            POSITION: {
                LENGTH: 17,
                WIDTH: 5,
                Y: -5,
                ANGLE: -7
            }
        },
        {
            POSITION: {
                LENGTH: 10,
                WIDTH: 4,
                ASPECT: -0.4,
                X: 9.5,
                Y: 5,
                ANGLE: 7
            }
        },
        {
            POSITION: {
                LENGTH: 17,
                WIDTH: 5,
                Y: 5,
                ANGLE: 7
            }
        },
        {
            POSITION: {
                LENGTH: 11,
                WIDTH: 12,
                ASPECT: -0.4,
                X: 9.5
            }
        },
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 13
            }
        }
    ]
}
Class.healer3_AR = {
    PARENT: "genericHealer",
    LABEL: "Healer-3",
    FACING_TYPE: ["spin", {speed: 0.02}],
    TURRETS: [
        ...weaponArray({
            TYPE: "healerAutoTankGun_AR",
            POSITION: {
                SIZE: 11,
                X: 8,
                ARC: 190
            }
        }, 3),
        {
            TYPE: "healerHat",
            POSITION: {
                SIZE: 13,
                LAYER: 1
            }
        }
    ]
}
Class.hewnTriple_AR = {
    PARENT: "genericTank",
    LABEL: "Hewn Triple",
    DANGER: 8,
    GUNS: [
        ...weaponMirror({
            POSITION: {
                LENGTH: 19,
                WIDTH: 8,
                Y: -5.5,
                ANGLE: -25
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.spam, g.doubleTwin, g.tripleTwin, g.hewnDouble, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        }, { delayIncrement: 0.5 }),
        ...weaponArray(weaponMirror({
            POSITION: {
                LENGTH: 20,
                WIDTH: 8,
                Y: 5.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.doubleTwin, g.tripleTwin, g.hewnDouble]),
                TYPE: "bullet"
            }
        }, { delayIncrement: 0.5 }), 3)
    ]
}
Class.hexaHealer_AR = {
    PARENT: "genericHealer",
    LABEL: "Hexa-Healer",
    GUNS: weaponArray([
        {
            POSITION: {
                LENGTH: 11,
                WIDTH: 9,
                ASPECT: -0.4,
                X: 9.5
            }
        },
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 10
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.healer]),
                TYPE: "healerBullet"
            }
        }
    ], 6, 0.5)
}
Class.hexer_AR = makeDrive("maleficitor", {label: "Hexer"})
Class.hextuplex_AR = {
    PARENT: "genericTank",
    LABEL: "Hextuplex",
    DANGER: 8,
    STAT_NAMES: statnames.desmos,
    GUNS: [
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 8,
                ASPECT: -1.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.desmos, g.twin, { reload: 2 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 8,
                ASPECT: -1.5,
                ANGLE: 60
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.desmos, g.twin, { reload: 2 }]),
                TYPE: ["bullet", {CONTROLLERS: [['snake', {invert: true, amplitude: 180, yOffset: 50}]]}]
            }
        },
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 8,
                ASPECT: -1.5,
                ANGLE: 120
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.desmos, g.twin, { reload: 2 }]),
                TYPE: ["bullet", {CONTROLLERS: [['snake', {invert: false, amplitude: 180, yOffset: 50}]]}]
            }
        },
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 8,
                ASPECT: -1.5,
                ANGLE: 180
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.desmos, g.twin, { reload: 2 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 8,
                ASPECT: -1.5,
                ANGLE: 240
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.desmos, g.twin, { reload: 2 }]),
                TYPE: ["bullet", {CONTROLLERS: [['snake', {invert: true, amplitude: 180, yOffset: -50}]]}]
            }
        },
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 8,
                ASPECT: -1.5,
                ANGLE: 300
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.desmos, g.twin, { reload: 2 }]),
                TYPE: ["bullet", {CONTROLLERS: [['snake', {invert: false, amplitude: 180, yOffset: -50}]]}]
            }
        },
        ...weaponArray(weaponMirror({
            POSITION: {
                LENGTH: 5,
                WIDTH: 5,
                ASPECT: -4,
                X: -5.25,
                Y: -7,
                ANGLE: 150
            }
        }), 3),
        ...weaponArray(weaponMirror({
            POSITION: {
                LENGTH: 5,
                WIDTH: 5,
                ASPECT: -4,
                X: -5.25,
                Y: -7,
                ANGLE: 90
            }
        }), 3)
    ]
}
Class.honchostorm_AR = makeDrive("honcho_AR", storm_options)
Class.infestordrive_AR = makeDrive("infestor")
Class.injection_AR = {
    PARENT: "genericHealer",
    LABEL: "Injection",
    GUNS: [
        {
            POSITION: {
                LENGTH: 15,
                WIDTH: 6,
                ASPECT: -0.4,
                X: 14
            }
        },
        {
            POSITION: {
                LENGTH: 13,
                WIDTH: 7,
                ASPECT: -0.4,
                X: 14
            }
        },
        {
            POSITION: {
                LENGTH: 24,
                WIDTH: 8
            }
        },
        {
            POSITION: {
                LENGTH: 21,
                WIDTH: 11
            }
        }
    ]
}
Class.inspector_AR = {
    PARENT: "genericTank",
    LABEL: "Inspector",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: 0.9 * base.SPEED,
        FOV: 1.1 * base.FOV
    },
    GUNS: weaponMirror({
        POSITION: {
            LENGTH: 5,
            WIDTH: 11,
            ASPECT: 1.3,
            X: 8,
            ANGLE: 90
        }
    })
}
Class.instructor_AR = makeDrive({
    PARENT: "genericTank",
    STAT_NAMES: statnames.drone,
    DANGER: 7,
    BODY: {FOV: base.FOV * 1.15},
    GUNS: weaponArray({
        POSITION: {
            LENGTH: 6,
            WIDTH: 12,
            ASPECT: 1.2,
            X: 8
        },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone]),
            TYPE: "drone",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 2,
            STAT_CALCULATOR: "drone"
        }
    }, 3)
}, {label: "Instructor"})
Class.instructor_AR.GUNS.push(...weaponArray({
    POSITION: {
        LENGTH: 9,
        WIDTH: 8.2,
        ASPECT: 0.6,
        X: 5,
        ANGLE: 180
    },
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.commander]),
        TYPE: "swarm",
        STAT_CALCULATOR: "swarm"
    }
}, 3, 1/3))
Class.junker_AR = makeOver("bentMinigun_AR", "Junker", preset.hybrid)
Class.prescriber_AR = makeDrive({
    PARENT: "genericTank",
    STAT_NAMES: statnames.drone,
    DANGER: 7,
    BODY: {FOV: base.FOV * 1.15},
    GUNS: weaponArray({
        POSITION: {
            LENGTH: 9,
            WIDTH: 8.2,
            ASPECT: 0.6,
            X: 5,
            ANGLE: 180
        },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.commander]),
            TYPE: "swarm",
            STAT_CALCULATOR: "swarm"
        }
    }, 3, 1/3)
}, {...preset.driveSwarm, label: "Prescriber"})
Class.prescriber_AR.GUNS.push(...weaponArray({
    POSITION: {
        LENGTH: 6,
        WIDTH: 12,
        ASPECT: 1.2,
        X: 8
    },
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone]),
        TYPE: "drone",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        MAX_CHILDREN: 2,
        STAT_CALCULATOR: "drone"
    }
}, 3))
//Class.instructor_AR = makeDrive("commander", {label: "Instructor", discrimination: true, discriminateFor: "drone"})
Class.intern_AR = {
    PARENT: "genericHealer",
    LABEL: "Intern",
    GUNS: [
        {
            POSITION: {
                LENGTH: 14,
                WIDTH: 9,
                ASPECT: -0.4,
                X: 14
            }
        },
        {
            POSITION: {
                LENGTH: 25,
                WIDTH: 10
            }
        }
    ]
}
Class.kingpin_AR = makeOver({
    PARENT: "genericTank",
    LABEL: "Trapper",
    DANGER: 6,
    STAT_NAMES: statnames.mixed,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.2
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 14,
                WIDTH: 8
            }
        },
        {
            POSITION: {
                LENGTH: 4,
                WIDTH: 8,
                ASPECT: 1.5,
                X: 14
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap"
            }
        }
    ]
}, "Kingpin", preset.cross)
Class.kraw_AR = {
    PARENT: "genericHealer",
    LABEL: "Kraw",
    STAT_NAMES: statnames.trap,
    GUNS: weaponMirror([
        {
            POSITION: {
                LENGTH: 15,
                WIDTH: 8,
                Y: 5.5,
                ANGLE: 5
            }
        },
        {
            POSITION: {
                LENGTH: 3.25,
                WIDTH: 8,
                ASPECT: 1.7,
                X: 14,
                Y: 5.5,
                ANGLE: 5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap"
            }
        }
    ], { delayIncrement: 0.5 })
}
Class.leader_AR = {
    PARENT: "genericTank",
    LABEL: "Leader",
    DANGER: 8,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: 0.85 * base.SPEED,
        FOV: 1.1 * base.FOV,
    },
    MAX_CHILDREN: 8,
    GUNS: [
        {
            POSITION: {
                LENGTH: 7,
                WIDTH: 13,
                ASPECT: 1.3,
                X: 8
            }
        }
    ]
}
Class.managerdrive_AR = makeDrive("manager")
Class.medicare_AR = {
    PARENT: "genericHealer",
    LABEL: "Medicare",
    STAT_NAMES: statnames.drone,
    GUNS: [
        {
            POSITION: {
                LENGTH: 4.5,
                WIDTH: 8,
                X: 10.5
            }
        },
        {
            POSITION: {
                LENGTH: 1,
                WIDTH: 10,
                X: 15
            }
        },
        {
            POSITION: {
                LENGTH: 3.5,
                WIDTH: 10,
                X: 8
            }
        }
    ]
}
Class.megaAutoBlaster_AR = makeAuto("blaster", "Mega Auto-Blaster", preset.megaAuto)
Class.megaAutoDouble_AR = makeAuto("doubleTwin", "Mega Auto-Double", preset.megaAuto)
Class.megaAutoDoubleMachine_AR = makeAuto("doubleMachine", "Mega Auto-Double Machine", preset.megaAuto)
Class.megaAutoGatlingGun_AR = makeAuto("gatlingGun", "Mega Auto-Gatling Gun", preset.megaAuto)
Class.megaAutoHelix_AR = makeAuto("helix", "Mega Auto-Helix", preset.megaAuto)
Class.megaAutoMarksman_AR = makeAuto("marksman", "Mega Auto-Marksman", preset.megaAuto)
Class.megaAutoSprayer_AR = makeAuto("sprayer", "Mega Auto-Sprayer", preset.megaAuto)
Class.megaCocciSegment_AR = {
    PARENT: "genericSmasher",
    COLOR: "mirror",
    CAN_BE_ON_LEADERBOARD: false,
    DISPLAY_NAME: false,
    BODY: {
        SPEED: 1.05 * base.SPEED,
        FOV: 1.1 * base.FOV,
        DENSITY: 4 * base.DENSITY
    },
    TURRETS: [
        {
            TYPE: ["hexagonHat_spin", { COLOR: "black" }],
            POSITION: { SIZE: 25 }
        }
    ]
}
Class.megaCocci_AR = {
    PARENT: "genericSmasher",
    LABEL: "Mega-Cocci",
    DANGER: 8,
    BODY: {
        SPEED: 1.05 * base.SPEED,
        FOV: 1.1 * base.FOV,
        DENSITY: 4 * base.DENSITY
    },
    TURRETS: [
        {
            TYPE: ["hexagonHat_spin", { COLOR: "black" }],
            POSITION: { SIZE: 25 }
        }
    ],
    ON: [
        {
            event: "tick",
            handler: ({ body }) => {
                const numOfSegments = 5;
                const segmentClass = "megaCocciSegment_AR";

                body.store.snakeSegments ??= [];

                for (let i = body.store.snakeSegments.length; i < numOfSegments; i++) {
                    let seg = new Entity(body, body);
                    seg.health = body.health;
                    seg.shield = body.shield;
                    seg.master = body;
                    seg.source = body;
                    seg.skill.score = body.skill.score;
                    seg.define(segmentClass);
                    body.store.snakeSegments.push(seg);
                }

                let previous = body;
                const children = body.store.snakeSegments;
            
                for (const child of children) {
                    const dx = child.x - previous.x;
                    const dy = child.y - previous.y;
                    const distance = Math.hypot(dx, dy) || 1; // /0 possible ig
                    const factor = (child.size + previous.size) * 1 / distance;
        
                    child.x = previous.x + dx * factor;
                    child.y = previous.y + dy * factor;
                    child.velocity.x = 0; // No natural move!
                    child.velocity.y = 0; // No natural move!
                    child.life();
                    previous = child;
                }
            }
        }
    ]
}
Class.megaWhirl3_AR = makeWhirlwind("mega3", {label: "Mega-Whirl-3"})
Class.mono_AR = {
    PARENT: "genericTank",
    LABEL: "Mono",
    DANGER: 8,
    GUNS: [
        {
            POSITION: {
                LENGTH: 21,
                WIDTH: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.single, g.single]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 13.5,
                WIDTH: 12
            }
        },
        {
            POSITION: {
                LENGTH: 3.5,
                WIDTH: 8,
                ASPECT: -1.5,
                X: 13.5
            }
        }
    ]
}
Class.necrodrive_AR = makeDrive("necromancer", {label: "Necrodrive"})
Class.nitwit_AR = makeBird("triplet", "Nitwit")
Class.nitwix_AR = makeBird("triplex", "Nitwix")
Class.octoWhirl_AR = makeWhirlwind("octoTank", {label: "Octo Whirl"})
Class.ointment_AR = {
    PARENT: "genericHealer",
    LABEL: "Ointment",
    GUNS: [
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 13
            }
        },
        {
            POSITION: {
                LENGTH: 11,
                WIDTH:7,
                ASPECT: -0.4,
                X: 14
            }
        },
        {
            POSITION: {
                LENGTH: 22,
                WIDTH: 8
            }
        }
    ]
}
Class.orifice_AR = {
    PARENT: "genericTank",
    LABEL: "Orifice",
    DANGER: 8,
    GUNS: [
        ...Class.single.GUNS,
        ...preset.rearPelleter
    ]
}
Class.overangle_AR = makeOver("triAngle", "Overangle", preset.sideOver)
Class.overartillery_AR = makeOver("artillery")
Class.overassassin_AR = makeOver("assassin")
Class.overblaster_AR = makeOver("blaster")
Class.overbuilder_AR = makeOver("builder")
Class.overdestroyer_AR = makeOver("destroyer")
Class.overdiesel_AR = makeOver("diesel_AR")
Class.overdoubleMachine_AR = makeOver("doubleMachine", "Overdouble Machine", preset.sideOver)
Class.overdoubleTwin_AR = makeOver("doubleTwin", "Overdouble Twin", preset.sideOver)
Class.overgatling_AR = makeOver("gatlingGun", "Overgatling")
Class.overhunter_AR = makeOver("hunter")
Class.overlauncher_AR = makeOver("launcher")
Class.overmarksman_AR = makeOver("marksman")
Class.overmach_AR = makeOver("machineTrapper_AR", "Overmach")
Class.overmech_AR = makeOver("mech_AR")
Class.overminigun_AR = makeOver("minigun")
Class.overgunnerdrive_AR = makeDrive("overgunner")
Class.overpen_AR = makeOver("pen_AR")
Class.overrifle_AR = makeOver("rifle")
Class.overshot_AR = makeOver("tripleShot", "Overshot")
Class.oversprayer_AR = makeOver("sprayer")
Class.overstorm_AR = makeDrive("overseer", {...storm_options, label: "Overstorm"})
Class.overtrapperdrive_AR = makeDrive("overtrapper")
Class.overtrapGuard_AR = makeOver("trapGuard", "Overtrap Guard", preset.sideOver)
Class.overwark_AR = makeOver("wark_AR", "Overwark")
Class.peaceMoon_AR = makeWhirlwind("deathStar", {label: "Peace Moon"})
Class.pentaBlaster_AR = {
    PARENT: "genericTank",
    LABEL: "Penta-Blaster",
    DANGER: 8,
    GUNS: [
        ...weaponMirror([{
            POSITION: {
                LENGTH: 13,
                WIDTH: 7,
                ASPECT: 1.5,
                X: 1,
                Y: 3,
                ANGLE: 30,
                DELAY: 2/3
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.blaster, { recoil: 0.5 }, g.lowPower, g.lowPower]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 13,
                WIDTH: 8,
                ASPECT: 1.7,
                X: 4,
                Y: 2,
                ANGLE: 15,
                DELAY: 1/3
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.blaster, { recoil: 0.5 }, g.lowPower]),
                TYPE: "bullet"
            }
        }]),
        {
            POSITION: {
                LENGTH: 13,
                WIDTH: 8,
                ASPECT: 1.9,
                X: 6
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.blaster, { recoil: 0.5 }]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.pentadrive_AR = makeDrive("pentaseer_AR", {label: "Pentadrive"})
Class.physician_AR = {
    PARENT: "genericSmasher",
    LABEL: "Physician",
    HEALING_TANK: true,
    FACING_TYPE: ["spin", {speed: 0.05}],
    GUNS: weaponArray({
        POSITION: {
            LENGTH: 0,
            WIDTH: 0
        }
    }, 12),
    TURRETS: [
        ...weaponArray({
            TYPE: ["pentagonHat_spin", { COLOR: "black" }],
            POSITION: { SIZE: 20 }
        }, 4),
        {
            TYPE: "healerHat",
            POSITION: {
                SIZE: 12.999999523162842,
                X: 0,
                Y: 0,
                ANGLE: 0,
                LAYER: 1,
            }
        }
    ]
}
Class.pistol_AR = {
    PARENT: "genericTank",
    LABEL: "Pistol",
    DANGER: 8,
    GUNS: [
        {
            POSITION: {
                LENGTH: 15,
                WIDTH: 12
            }
        },
        {
            POSITION: {
                LENGTH: 19,
                WIDTH: 7
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.single, g.rifle]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 5.5,
                WIDTH: 7,
                ASPECT: -1.8,
                X: 6.5
            }
        }
    ]
}
Class.productiondrive_AR = makeDrive("productionist_AR", {...preset.driveSwarm, label: "Productiondrive"})
Class.professor_AR = {
    PARENT: "genericHealer",
    LABEL: "Professor",
    STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: {
                LENGTH: 16,
                WIDTH: 9,
                ANGLE: 180
            }
        },
        {
            POSITION: {
                LENGTH: 13.5,
                WIDTH: 10,
                ANGLE: 180
            }
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 9,
                ASPECT: 1.5,
                X: 16,
                ANGLE: 180
            }
        },
        {
            POSITION: {
                LENGTH: 11,
                WIDTH: 9,
                ASPECT: -0.4,
                X: 9.5
            }
        },
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 10
            }
        }
    ]
}
Class.quadMachine_AR = {
    PARENT: "genericTank",
    LABEL: "Quad Machine",
    DANGER: 7,
    GUNS: weaponArray({
        POSITION: {
            LENGTH: 12,
            WIDTH: 10,
            ASPECT: 1.4,
            X: 8
        },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, { size: 0.92 }, g.flankGuard, g.flankGuard, g.spam]),
            TYPE: "bullet"
        }
    }, 4)
}
Class.quadTwin_AR = {
    PARENT: "genericTank",
    LABEL: "Quad Twin",
    DANGER: 8,
    GUNS: weaponArray(weaponMirror({
        POSITION: {
            LENGTH: 20,
            WIDTH: 8,
            Y: 5.5
        },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.doubleTwin, g.tripleTwin]),
            TYPE: "bullet"
        }
    }, {delayIncrement: 0.5}), 4)
}
Class.quintuplet_AR = {
    PARENT: "genericTank",
    LABEL: "Quintuplet",
    DANGER: 7,
    BODY: {
        FOV: 1.1 * base.FOV
    },
    GUNS: [
        ...weaponMirror([{
            POSITION: {
                LENGTH: 16,
                WIDTH: 10,
                Y: 5,
                DELAY: 2/3
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.quint]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 19,
                WIDTH: 10,
                Y: 3,
                DELAY: 1/3
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.quint]),
                TYPE: "bullet"
            }
        }]),
        {
            POSITION: {
                LENGTH: 22,
                WIDTH: 10
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.quint]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.quintuplex_AR = {
    PARENT: "genericTank",
    LABEL: "Quintuplex",
    DANGER: 8,
    STAT_NAMES: statnames.desmos,
    GUNS: [
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 7,
                ASPECT: -1.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, {speed: 1.25, maxSpeed: 1.25}]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 7,
                ASPECT: -1.5,
                ANGLE: 45,
                DELAY: 1/3
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.desmos]),
                TYPE: ["bullet", {CONTROLLERS: ['snake']}]
            },
        },
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 7,
                ASPECT: -1.5,
                ANGLE: -45,
                DELAY: 1/3
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.desmos]),
                TYPE: ["bullet", {CONTROLLERS: [['snake', {invert: true}]]}]
            },
        },
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 7,
                ASPECT: -1.5,
                ANGLE: 90,
                DELAY: 2/3
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.desmos]),
                TYPE: ["bullet", {CONTROLLERS: ['snake']}]
            },
        },
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 7,
                ASPECT: -1.5,
                ANGLE: -90,
                DELAY: 2/3
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.desmos]),
                TYPE: ["bullet", {CONTROLLERS: [['snake', {invert: true}]]}]
            },
        },
        ...weaponMirror([{
            POSITION: {
                LENGTH: 5,
                WIDTH: 5,
                ASPECT: -4,
                X: -4.75,
                Y: -5,
                ANGLE: 0
            }
        },
        {
            POSITION: {
                LENGTH: 15.5,
                WIDTH: 3,
                ASPECT: -4,
                ANGLE: 22.5
            }
        },
        {
            POSITION: {
                LENGTH: 15.5,
                WIDTH: 3,
                ASPECT: -4,
                ANGLE: 67.5
            }
        }], { delayIncrement: 0.5 }),
    ]
}
Class.ransacker_AR = {
    PARENT: "genericTank",
    LABEL: "Ransacker",
    DANGER: 8,
    BODY: {
        FOV: base.FOV * 1.225
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 12
            }
        },
        {
            POSITION: {
                LENGTH: 24,
                WIDTH: 7
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                TYPE: "bullet"
            }
        },
        ...preset.trapGuard
    ]
}
Class.renovator_AR = {
    PARENT: "genericHealer",
    LABEL: "Renovator",
    GUNS: [
        {
            POSITION: {
                LENGTH: 11,
                WIDTH: 9,
                ASPECT: -0.4,
                X: 9.5
            }
        },
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 10
            }
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 10,
                ASPECT: -1.8
            }
        }
    ]
}
Class.rotator_AR = makeOver("rotaryGun_AR", "Rotator", preset.hybrid)
Class.scatterer_AR = {
    PARENT: "genericTank",
    LABEL: "Scatterer",
    DANGER: 8,
    GUNS: [
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 10,
                ASPECT: 1.4,
                X: 11
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 10,
                ASPECT: 1.4,
                X: 8,
                DELAY: 0.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.schwartz_AR = makeWhirlwind("force_AR", {label: "Schwartz"})
Class.scribble_AR = {
    PARENT: "genericHealer",
    LABEL: "Scribble",
    STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: {
                LENGTH: 11,
                WIDTH: 6,
                ASPECT: -0.4,
                X: 12
            }
        },
        {
            POSITION: {
                LENGTH: 21.5,
                WIDTH: 7
            }
        },
        {
            POSITION: {
                LENGTH: 13.5,
                WIDTH: 8
            }
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 7,
                ASPECT: 1.5,
                X: 16
            }
        }
    ]
}
Class.sharpshooter_AR = {
    PARENT: "genericTank",
    LABEL: "Sharpshooter",
    DANGER: 8,
    BODY: {
        FOV: 1.2 * base.FOV
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 25,
                WIDTH: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.single]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 5.5,
                WIDTH: 8,
                ASPECT: -1.8,
                X: 6.5
            }
        }
    ]
}
Class.slabNSlab_AR = {
    PARENT: "genericTank",
    LABEL: "Slab 'n Slab",
    DANGER: 8,
    GUNS: weaponArray([
        {
            POSITION: {
                LENGTH: 24,
                WIDTH: 8,
                ASPECT: 1.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.focal, g.spam, g.flankGuard, g.flankGuard]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 13,
                WIDTH: 8,
                ASPECT: 1.9,
                X: 4
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.blaster, g.spam, g.flankGuard, g.flankGuard]),
                TYPE: "bullet"
            }
        }
    ], 2)
}
Class.smearer_AR = makeOver("spreadshot", "Smearer", preset.hybrid)
Class.sootherdrive_AR = {
    PARENT: "genericHealer",
    LABEL: "Sootherdrive",
    STAT_NAMES: statnames.drone,
    BODY: Class.soother_AR.BODY,
    TURRETS: [
        {
            TYPE: "healerHat",
            POSITION: {
                SIZE: 13,
                LAYER: 2
            }
        },
        {
            TYPE: ["squareHat", { COLOR: "grey" }],
            POSITION: {
                SIZE: 9,
                LAYER: 1
            }
        }
    ],
    GUNS: [
        {
            POSITION: {
                LENGTH: 5,
                WIDTH: 11,
                ASPECT: 1.3,
                X: 8
            }/*,
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone]),
                TYPE: "turretedDrone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "drone",
                MAX_CHILDREN: 6,
                WAIT_TO_CYCLE: true
            }*/
        }
    ]
}
Class.spambrid_AR = makeOver("bentGunner_AR", "Spambrid", preset.hybrid)
Class.spawnerstorm_AR = makeDrive("spawner", storm_options)
Class.spiker_AR = {
    PARENT: "genericHealer",
    LABEL: "Spiker",
    STAT_NAMES: statnames.drone,
    BODY: {
        FOV: base.FOV * 1.1
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 5,
                WIDTH: 10,
                ASPECT: 1.3,
                X: 8
            }
        },
        {
            POSITION: {
                LENGTH: 6,
                WIDTH: 1,
                ASPECT: -5,
                X: 8
            }
        }
    ]
}
Class.splitHybrid_AR = makeOver("splitShot_AR", "Split Hybrid", preset.hybrid)
Class.sprayNSpray_AR = {
    PARENT: "genericTank",
    LABEL: "Spray 'n Spray",
    DANGER: 8,
    HAS_NO_RECOIL: true,
    GUNS: [
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 7,
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.lowPower, g.pelleter, { recoil: 1.15 }, g.flankGuard]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 13,
                WIDTH: 8,
                ASPECT: 1.9,
                X: 4
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.blaster, g.flankGuard]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 25,
                WIDTH: 7,
                ANGLE: 180
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.lowPower, g.machineGun, { recoil: 1.15 }, g.flankGuard]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 14,
                WIDTH: 9.5,
                ASPECT: 1.25,
                X: 8,
                ANGLE: 180
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.focal, g.flankGuard]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.spy_AR = {
    PARENT: "genericTank",
    LABEL: "Spy",
    DANGER: 8,
    INVISIBLE: [0.08, 0.03],
    TOOLTIP: "Stay still to turn invisible.",
    GUNS: [
        {
            POSITION: {
                LENGTH: 12.5,
                WIDTH: 8,
                ASPECT: -1.8,
                X: 6.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.subduer_AR = {
    PARENT: "genericTank",
    LABEL: "Subduer",
    DANGER: 8,
    BODY: {
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.05
    },
    CONTROLLERS: ["zoom"],
    TOOLTIP: "Hold right click to zoom.",
    GUNS: [
        {
            POSITION: {
                LENGTH: 19,
                WIDTH: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.single, g.hunter, g.hunterSecondary]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 16,
                WIDTH: 11,
                DELAY: 0.25
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.single, g.hunter]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 5.5,
                WIDTH: 11,
                ASPECT: -1.3,
                X: 6.5
            }
        }
    ]
}
Class.ternion_AR = {
    PARENT: "genericTank",
    LABEL: "Ternion",
    DANGER: 8,
    GUNS: weaponArray([
        {
            POSITION: {
                LENGTH: 19,
                WIDTH: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.single]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 5.5,
                WIDTH: 8,
                ASPECT: -1.8,
                X: 6.5
            }
        }
    ], 3)
}
Class.therapist_AR = {
    PARENT: "genericHealer",
    LABEL: "Therapist",
    GUNS: weaponMirror([
        {
            POSITION: {
                LENGTH: 5,
                WIDTH: 2.5,
                ASPECT: -0.4,
                X: 9.5,
                Y: 7.25
            }
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 3.5,
                Y: 7.25
            }
        },
        {
            POSITION: {
                LENGTH: 9,
                WIDTH: 2.5,
                ASPECT: -0.4,
                X: 9.5,
                Y: 3.75
            }
        },
        {
            POSITION: {
                LENGTH: 16,
                WIDTH: 3.5,
                Y: 3.75
            }
        }
    ], { delayIncrement: 0.5 })
}
Class.tommy_AR = {
    PARENT: "genericTank",
    LABEL: "Tommy",
    DANGER: 8,
    BODY: {
        FOV: base.FOV * 1.2
    },
    GUNS: [
        ...weaponStack({
            POSITION: {
                LENGTH: 21,
                WIDTH: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun]),
                TYPE: "bullet"
            }
        }, 3, { lengthOffset: 2, delayIncrement: 1/3 }),
        ...preset.trapGuard
    ]
}
Class.tornado_AR = {
    PARENT: "genericTank",
    LABEL: "Tornado",
    DANGER: 8,
    GUNS: weaponArray([
        {
            POSITION: {
                LENGTH: 16,
                WIDTH: 5.5,
                ANGLE: 90,
                DELAY: 0.75
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 16,
                WIDTH: 5.5,
                ANGLE: 30,
                DELAY: 0.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 16,
                WIDTH: 5.5,
                ANGLE: 60,
                DELAY: 0.25
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 16,
                WIDTH: 5.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet"
            }
        }
    ], 3)
}
Class.triWhirlGuard_AR = makeWhirlwind("triTrapGuard_AR", {label: "Tri-Whirl Guard"})
Class.tricker_AR = {
    PARENT: "genericTank",
    LABEL: "Tricker",
    DANGER: 8,
    STAT_NAMES: statnames.trap,
    GUNS: [
        {
            POSITION: {
                LENGTH: 16,
                WIDTH: 7
            }
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 7,
                ASPECT: 1.7,
                X: 16
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.single]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap"
            }
        },
        {
            POSITION: {
                LENGTH: 5.5,
                WIDTH: 7,
                ASPECT: -1.8,
                X: 6.5
            }
        }
    ]
}
Class.tripleArtillery_AR = {
    PARENT: "genericTank",
    LABEL: "Triple Artillery",
    DANGER: 8,
    GUNS: weaponArray([
        ...weaponMirror({
            POSITION: {
                LENGTH: 17,
                WIDTH: 5,
                Y: -5,
                ANGLE: -7,
                DELAY: 0.25
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery, g.flankGuard]),
                TYPE: "bullet",
                LABEL: "Secondary"
            }
        }, { delayIncrement: 0.5 }),
        {
            POSITION: {
                LENGTH: 19,
                WIDTH: 12
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.flankGuard]),
                TYPE: "bullet",
                LABEL: "Heavy"
            }
        }
    ], 3)
}
Class.tripleAutoBlaster_AR = makeAuto("blaster", "Triple Auto-Blaster", preset.tripleAuto)
Class.tripleAutoDouble_AR = makeAuto("doubleTwin", "Triple Auto-Double", preset.tripleAuto)
Class.tripleAutoDoubleMachine_AR = makeAuto("doubleMachine", "Triple Auto-Double Machine", preset.tripleAuto)
Class.tripleAutoGatlingGun_AR = makeAuto("gatlingGun", "Triple Auto-Gatling Gun", preset.tripleAuto)
Class.tripleAutoHelix_AR = makeAuto("helix", "Triple Auto-Helix", preset.tripleAuto)
Class.tripleAutoMarksman_AR = makeAuto("marksman", "Triple Auto-Marksman", preset.tripleAuto)
Class.tripleAutoSprayer_AR = makeAuto("sprayer", "Triple Auto-Sprayer", preset.tripleAuto)
Class.tripleBlaster_AR = {
    PARENT: "genericTank",
    LABEL: "Triple Blaster",
    DANGER: 7,
    GUNS: weaponArray({
        POSITION: {
            LENGTH: 13,
            WIDTH: 8,
            ASPECT: 1.9,
            X: 4
        },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.blaster, g.flankGuard, g.flankGuard]),
            TYPE: "bullet"
        }
    }, 3)
}
Class.tripleDiesel_AR = {
    PARENT: "genericTank",
    LABEL: "Triple Diesel",
    DANGER: 8,
    GUNS: weaponArray({
        POSITION: {
            LENGTH: 14,
            WIDTH: 12,
            ASPECT: 1.6,
            X: 8,
            ANGLE: 0
        }
    }, 3)
}
Class.tripleFlankTwin_AR = {
    PARENT: "genericTank",
    LABEL: "Triple Flank Twin",
    DANGER: 8,
    GUNS: weaponArray([
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 8,
                ANGLE: 60
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard]),
                TYPE: "bullet"
            }
        },
        ...weaponMirror({
            POSITION: {
                LENGTH: 20,
                WIDTH: 8,
                Y: 5.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.doubleTwin, g.tripleTwin]),
                TYPE: "bullet"
            }
        }, { delayIncrement: 0.5 })
    ], 3)
}
Class.tripleGatling_AR = {
    PARENT: "genericTank",
    LABEL: "Triple Gatling",
    DANGER: 7,
    GUNS: weaponArray({
        POSITION: {
            LENGTH: 24,
            WIDTH: 8,
            ASPECT: 1.5
        },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.focal, g.flankGuard, g.flankGuard]),
            TYPE: "bullet"
        }
    }, 3)
}
Class.tripleGunner_AR = {
    PARENT: "genericTank",
    LABEL: "Triple Gunner",
    DANGER: 8,
    GUNS: weaponArray(weaponMirror([
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 3.5,
                Y: 7.25,
                DELAY: 0.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.doubleTwin, g.tripleTwin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 16,
                WIDTH: 3.5,
                Y: 3.75
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.doubleTwin, g.tripleTwin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        }
    ], { delayIncrement: 0.25 }), 3)
}
Class.tripleHelix_AR = {
    PARENT: "genericTank",
    LABEL: "Triple Helix",
    DANGER: 8,
    STAT_NAMES: statnames.desmos,
    GUNS: weaponArray([
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 6,
                ASPECT: -1.5,
                Y: -5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.doubleTwin, g.tripleTwin, g.desmos]),
                TYPE: ["bullet", {CONTROLLERS: ['snake']}]
            },
        },
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 6,
                ASPECT: -1.5,
                Y: 5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.doubleTwin, g.tripleTwin, g.desmos]),
                TYPE: ["bullet", {CONTROLLERS: [['snake', {invert: true}]]}]
            },
        },
        {
            POSITION: {
                LENGTH: 16.5,
                WIDTH: 2,
                ASPECT: -9.25
            }
        },
        ...weaponMirror({
            POSITION: {
                LENGTH: 4,
                WIDTH: 5,
                ASPECT: -4,
                X: -9.5,
                Y: -7,
                ANGLE: 90
            }
        }, { delayIncrement: 0.5 })
    ], 3)
}
Class.tripleMinigun_AR = {
    PARENT: "genericTank",
    LABEL: "Triple Minigun",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.2
    },
    GUNS: weaponArray(weaponStack({
        POSITION: {
            LENGTH: 21,
            WIDTH: 8
        },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.flankGuard, g.flankGuard]),
            TYPE: "bullet"
        }
    }, 3, { lengthOffset: 2, delayIncrement: 1/3 }), 3)
}
Class.tripleSprayer_AR = {
    PARENT: "genericTank",
    LABEL: "Triple Sprayer",
    DANGER: 8,
    GUNS: weaponArray([
        {
            POSITION: {
                LENGTH: 23,
                WIDTH: 7
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.lowPower, g.pelleter, { recoil: 1.15 }, g.flankGuard, g.flankGuard]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 10,
                ASPECT: 1.4,
                X: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.flankGuard, g.flankGuard]),
                TYPE: "bullet"
            }
        }
    ], 3)
}
Class.triprid_AR = makeOver("triplet", "Triprid", preset.hybrid)
Class.triprix_AR = makeOver("triplex", "Triprix", preset.hybrid)
Class.tyrant_AR = makeDrive("overlord", {label: "Tyrant"})
Class.understorm_AR = makeDrive("underseer", {...storm_options, label: "Understorm"})
Class.ultraTornado_AR = {
    PARENT: "genericTank",
    LABEL: "Ultra-Tornado",
    DANGER: 8,
    TURRETS: [
        {
            TYPE: ["circleHat", { COLOR: "grey" }],
            POSITION: [16, 0, 0, 0, 360, 1],
        },
    ],
    ANGLE: 360,
    CONTROLLERS: ["whirlwind"],
    HAS_NO_RECOIL: true,
    STAT_NAMES: statnames.satellite,
    AI: {
        SPEED: 2, 
    }, 
    GUNS: (() => { 
        let output = []
        for (let i = 0; i < 1; i++) { 
            output.push({ 
                POSITION: {WIDTH: 20, LENGTH: 1, DELAY: i * 0.25},
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.satellite, g.pounder, g.destroyer, g.annihilator]), 
                    TYPE: ["satellite", {ANGLE: i * 180}], 
                    MAX_CHILDREN: 1,   
                    AUTOFIRE: true,  
                    SYNCS_SKILLS: false,
                    WAIT_TO_CYCLE: true
                }
            }) 
        }
        return output
    })()
}
Class.vortex_AR = makeDrive("director", {label: "Vortex", type: "vortexAutoTurret_AR", size: 12, hatType: "vortexSquare_AR"})
Class.vulcan_AR = {
    PARENT: "genericTank",
    LABEL: "Vulcan",
    DANGER: 7,
    GUNS: [ // Each gun will be stacked to mimic a "back-forth" firing pattern, isn't present right now
        {
            POSITION: {
                LENGTH: 30,
                WIDTH: 1.5,
                Y: -4.45
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.fast]),
                TYPE: "bullet",
            }
        },
        {
            POSITION: {
                LENGTH: 30,
                WIDTH: 1.5,
                Y: 4.45,
                DELAY: 0.8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.fast]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: {
                LENGTH: 30,
                WIDTH: 1.5,
                Y: 2.5,
                DELAY: 0.2
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.fast]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: {
                LENGTH: 30,
                WIDTH: 1.5,
                Y: -2.5,
                DELAY: 0.6
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.fast]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: {
                LENGTH: 30,
                WIDTH: 1.5,
                DELAY: 0.4
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.fast]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 14
            }
        },
        {
            POSITION: {
                LENGTH: 5,
                WIDTH: 14,
                X: 20
            }
        }
    ]
}
Class.warkwarkwark_AR = {
    PARENT: "genericTank",
    LABEL: "Warkwarkwark",
    DANGER: 8,
    STAT_NAMES: statnames.trap,
    GUNS: weaponArray(weaponMirror([
        {
            POSITION: {
                LENGTH: 15,
                WIDTH: 8,
                Y: 5.5,
                ANGLE: 5
            }
        },
        {
            POSITION: {
                LENGTH: 3.25,
                WIDTH: 8,
                ASPECT: 1.7,
                X: 14,
                Y: 5.5,
                ANGLE: 5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.spam, g.doubleTwin, g.tripleTwin]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap"
            }
        }
    ], { delayIncrement: 0.5 }), 3)
}
Class.whirl4_AR = makeWhirlwind("auto4", {label: "Whirl-4"})
Class.whirl5_AR = makeWhirlwind("auto5", {label: "Whirl-5"})
Class.whirlbar_AR = makeWhirlwind("crowbar_AR", {label: "Whirlbar"})

// Tier 5 (are we deadass)
Class.custodian_AR = {
    PARENT: "genericTank",
    LABEL: "Custodian",
    DANGER: 8,
    STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: {
                LENGTH: 19,
                WIDTH: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 5.5,
                WIDTH: 8,
                ASPECT: -1.8,
                X: 6.5
            }
        },
        ...preset.trapGuard
    ]
}

// Class Tree
if (!Config.arms_race == true) {return}
if (!use_original_tree) {
//Config.level_cap = 60
//Config.level_cap_cheat = 60
/*for (let i = 0; i < Class.assassin.UPGRADES_TIER_3.length; i++) {
    let string = Class.assassin.UPGRADES_TIER_3[i];
    if (string === "single") {
        Class.assassin.UPGRADES_TIER_3.splice(i, 1)
    }
}*/

Class.menu_unused.UPGRADES_TIER_0.push("menu_unused_AR")
Class.menu_unused_AR = makeMenu("Unused (Tier 4)", {upgrades: ["custodian_AR", "duster_AR"], boxLabel: "Tier 4 (Lv.45+)"})

//Class.basic.UPGRADES_TIER_1
    //Class.basic.UPGRADES_TIER_2
        Class.smasher.UPGRADES_TIER_3.push(/*"cocci", */"banger_AR", "drifter_AR")
            Class.megaSmasher.UPGRADES_TIER_3 = [/*"megaCocci"*/].map(x => x + "_AR")
            Class.spike.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.autoSmasher.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.landmine.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            //Class.bonker.UPGRADES_TIER_3 = ["decoy", "spear", "autoBonker", "megaBonker", "basher", "thwacker", "bundler"].map(x => x + "_AR")
            //Class.cocci.UPGRADES_TIER_3 = ["megaCocci"].map(x => x + "_AR")
            //Class.banger_AR.UPGRADES_TIER_3 = ["megaBanger", "prick", "autoBanger", "tripwire", "thwacker", "sharper"].map(x => x + "_AR")
            //Class.drifter_AR.UPGRADES_TIER_3 = ["buncher", "megaDrifter", "autoDrifter", "vessel", "cauldron", "sharper", "bundler"].map(x => x + "_AR")
        Class.healer.UPGRADES_TIER_3 = ["nurse_AR", "medic", "psychiatrist_AR", "triHealer_AR", "soother_AR", "analyzer_AR", "scientist_AR", "recalibrator_AR"]
            Class.healer.UPGRADES_TIER_3.push("physician_AR", "renovator_AR")
            Class.nurse_AR.UPGRADES_TIER_3 = ["clinician_AR", "paramedic", "therapist_AR", "hexaHealer_AR", "geneticist_AR", "kraw_AR"]
            Class.medic.UPGRADES_TIER_3 = ["intern", "injection", "actuary", "ointment"].map(x => x + "_AR")
            Class.psychiatrist_AR.UPGRADES_TIER_3 = ["guru", "actuary", "therapist", "PLACEHOLDER_healerSprayer"/*, [DIESEL HEALER], [MACHTRAP HEALER]*/].map(x => x + "_AR")
            Class.triHealer_AR.UPGRADES_TIER_3 = ["hexaHealer_AR", "ambulance", "healer3_AR", "professor_AR", "chemist_AR"]
            Class.soother_AR.UPGRADES_TIER_3 = ["PLACEHOLDER_healerOverseer", "antidote", "PLACEHOLDER_healerUnderseer", "medicare", "sootherdrive", "doctor", "spiker"].map(x => x + "_AR")
            Class.analyzer_AR.UPGRADES_TIER_3 = ["accountant_AR", "surgeon", "guru_AR", "clerk_AR"]
            Class.scientist_AR.UPGRADES_TIER_3 = ["surgeon", "chemist_AR", "professor_AR", "scribble_AR"/*, [MECH HEALER], [MACHTRAP HEALER]*/, "kraw_AR"]
            Class.recalibrator_AR.UPGRADES_TIER_3 = ["geneticist"].map(x => x + "_AR")

    Class.twin.UPGRADES_TIER_2.push("wark_AR")
        Class.twin.UPGRADES_TIER_3.splice(1, 1) //remove bulwark
            Class.twin.UPGRADES_TIER_3.push("duo_AR")
        Class.doubleTwin.UPGRADES_TIER_3.push("doubleFlankTwin_AR", "doubleGunner_AR", "doubleHelix_AR", "warkwark_AR")
            Class.tripleTwin.UPGRADES_TIER_3 = ["quadTwin", "autoTriple", "bentTriple", "hewnTriple", "tripleFlankTwin", "tripleGunner", "tripleHelix", "warkwarkwark"].map(x => x + "_AR")
            Class.hewnDouble.UPGRADES_TIER_3 = ["hewnTriple", "autoHewnDouble"].map(x => x + "_AR")
            Class.autoDouble.UPGRADES_TIER_3 = ["megaAutoDouble", "tripleAutoDouble", "autoTriple", "autoHewnDouble", "autoBentDouble", "autoDoubleFlank", "autoDoubleGunner", "autoDoubleHelix", "autoWarkwark"].map(x => x + "_AR")
            Class.bentDouble.UPGRADES_TIER_3 = ["bentTriple", "autoBentDouble", "doubleTriplet"].map(x => x + "_AR")
            Class.doubleFlankTwin_AR.UPGRADES_TIER_3 = ["tripleFlankTwin", "autoDoubleFlank"].map(x => x + "_AR")
            Class.doubleGunner_AR.UPGRADES_TIER_3 = ["tripleGunner", "autoDoubleGunner"].map(x => x + "_AR")
            Class.doubleHelix_AR.UPGRADES_TIER_3 = ["tripleHelix", "autoDoubleHelix"].map(x => x + "_AR")
            Class.warkwark_AR.UPGRADES_TIER_3 = ["warkwarkwark", "autoWarkwark"].map(x => x + "_AR")
        Class.tripleShot.UPGRADES_TIER_3.push("splitShot_AR", "autoTripleShot_AR", "bentGunner_AR", "bentMinigun_AR", "defect_AR", "waarrk_AR")
            Class.pentaShot.UPGRADES_TIER_3 = ["flexedHybrid"].map(x => x + "_AR")
            Class.spreadshot.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.bentHybrid.UPGRADES_TIER_3 = ["overshot", "flexedHybrid", "smearer", "triprid", "triprix", "splitHybrid", "autoBentHybrid", "spambrid", "junker", "bentCatcher"].map(x => x + "_AR")
            //Class.bentDouble.UPGRADES_TIER_3
            Class.triplet.UPGRADES_TIER_3 = ["quintuplet", "bentTriple", "triprid"].map(x => x + "_AR")
            Class.triplex.UPGRADES_TIER_3 = ["triprix", "autoTriplex"].map(x => x + "_AR")
            Class.splitShot_AR.UPGRADES_TIER_3 = ["splitHybrid"].map(x => x + "_AR")
            Class.autoTripleShot_AR.UPGRADES_TIER_3 = ["autoTriplex"].map(x => x + "_AR")
            Class.bentGunner_AR.UPGRADES_TIER_3 = ["spambrid"].map(x => x + "_AR")
            Class.bentMinigun_AR.UPGRADES_TIER_3 = ["junker"].map(x => x + "_AR")
            Class.defect_AR.UPGRADES_TIER_3 = ["deficiency", "bozo", "nitwit", "nitwix", "dork", "autoDefect", "donkey", "fault"].map(x => x + "_AR")
            Class.waarrk_AR.UPGRADES_TIER_3 = ["bentCatcher"].map(x => x + "_AR")
        Class.gunner.UPGRADES_TIER_3.push("rimfire_AR", "volley_AR", "doubleGunner_AR", "bentGunner_AR", "equalizer_AR")
            Class.autoGunner.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.nailgun.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.auto4.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.machineGunner.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.gunnerTrapper.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.cyclone.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.overgunner.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.battery.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.buttbuttin.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.blower.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.rimfire_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.volley_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.doubleGunner_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            //Class.bentGunner_AR.UPGRADES_TIER_3
            Class.equalizer_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")
        Class.hexaTank.UPGRADES_TIER_3.push("autoHexaTank_AR", "mingler_AR", "combo_AR")
            Class.hexaTank.UPGRADES_TIER_3.push("tripleFlankTwin_AR", "hextuplex_AR")
            Class.octoTank.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            //Class.cyclone.UPGRADES_TIER_3
            Class.deathStar.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.autoHexaTank_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.mingler_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.combo_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")
        Class.helix.UPGRADES_TIER_3.push("doubleHelix_AR", "hybrix_AR", "autoHelix_AR")
            //Class.triplex.UPGRADES_TIER_3
            Class.quadruplex.UPGRADES_TIER_3 = ["hextuplex", "autoQuadruplex"].map(x => x + "_AR")
            Class.hybrix_AR.UPGRADES_TIER_3 = ["triprix"].map(x => x + "_AR")
            Class.autoHelix_AR.UPGRADES_TIER_3 = ["megaAutoHelix", "tripleAutoHelix", "autoTriplex", "autoQuadruplex"].map(x => x + "_AR")
        Class.wark_AR.UPGRADES_TIER_3 = ["warkwark_AR", "waarrk_AR", "equalizer_AR", "hexaTrapper", "hutch_AR", "cog_AR", "expeller_AR", "bulwark", "coalesce_AR", "autoWark_AR"]
            //Class.warkwark_AR.UPGRADES_TIER_3
            //Class.waarrk_AR.UPGRADES_TIER_3
            //Class.equalizer_AR.UPGRADES_TIER_3
            //Class.hexaTrapper.UPGRADES_TIER_3
            Class.hutch_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.cog_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.expeller_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.bulwark.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.coalesce_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.autoWark_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")

    //Class.sniper.UPGRADES_TIER_2
        Class.sniper.UPGRADES_TIER_3.push("railgun_AR")
            Class.sniper.UPGRADES_TIER_3.push("sharpshooter_AR")
        Class.assassin.UPGRADES_TIER_3.push("hitman_AR", "sniper3_AR", "enforcer_AR", "courser_AR")
            Class.ranger.UPGRADES_TIER_3 = ["mono"].map(x => x + "_AR")
            Class.stalker.UPGRADES_TIER_3 = ["spy"].map(x => x + "_AR")
            Class.falcon.UPGRADES_TIER_3 = ["avian"].map(x => x + "_AR")
            Class.autoAssassin.UPGRADES_TIER_3 = ["autoSingle", "autoDeadeye"].map(x => x + "_AR")
            Class.single.UPGRADES_TIER_3 = ["mono", "duo", "sharpshooter", "gadgetGun", "ternion", "coordinator", "bruiser", "tricker"/*, [DESMOS SINGLE]*/, "avian", "spy", "autoSingle", "cyclops", "orifice", "assistant", "pistol", "subduer"].map(x => x + "_AR") // custodian is overtiered garbage :fire:
                //Class.ternion.UPGRADES_TIER_3 = ["custodian"].map(x => x + "_AR")
                //Class.tricker.UPGRADES_TIER_3 = ["custodian"].map(x => x + "_AR")
            Class.buttbuttin.UPGRADES_TIER_3 = ["orifice"].map(x => x + "_AR")
            Class.hitman_AR.UPGRADES_TIER_3 = ["assistant"].map(x => x + "_AR")
            Class.enforcer_AR.UPGRADES_TIER_3 = ["pistol"].map(x => x + "_AR")
            Class.courser_AR.UPGRADES_TIER_3 = ["subduer"].map(x => x + "_AR")
        Class.hunter.UPGRADES_TIER_3.push("autoHunter_AR", "megaHunter_AR", "prober_AR", "courser_AR")
            Class.autoHunter_AR.UPGRADES_TIER_4 = ["autoNimrod"].map(x => x + "_AR")
        Class.minigun.UPGRADES_TIER_3.push("zipper_AR", "bentMinigun_AR", "autoMinigun_AR", "widget_AR")
            Class.autoMinigun_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")
        Class.rifle.UPGRADES_TIER_3.push("autoRifle_AR", "enforcer_AR", "prober_AR")
            Class.autoRifle_AR.UPGRADES_TIER_4 = ["autoRevolver"].map(x => x + "_AR")
        Class.marksman.UPGRADES_TIER_3.push("PLACEHOLDER_hybridMarksman_AR", "autoMarksman_AR")
            Class.deadeye.UPGRADES_TIER_4 = ["cyclops", "autoDeadeye"].map(x => x + "_AR")
            Class.nimrod.UPGRADES_TIER_4 = ["autoNimrod"].map(x => x + "_AR")
            Class.revolver.UPGRADES_TIER_4 = ["autoRevolver"].map(x => x + "_AR")
            Class.fork.UPGRADES_TIER_4 = ["autoFork"].map(x => x + "_AR")
            Class.PLACEHOLDER_hybridMarksman_AR.UPGRADES_TIER_4 = ["overmarksman", "PLACEHOLDER_autoHybridMarksman"].map(x => x + "_AR")
            Class.autoMarksman_AR.UPGRADES_TIER_4 = ["megaAutoMarksman", "tripleAutoMarksman", "autoDeadeye", "autoNimrod", "autoRevolver", "autoFork", "PLACEHOLDER_autoHybridMarksman"].map(x => x + "_AR")

    Class.machineGun.UPGRADES_TIER_2.push("diesel_AR", "machineTrapper_AR")
        //Class.machineGun.UPGRADES_TIER_3
            Class.machineGun.UPGRADES_TIER_3 = ["gadgetGun_AR"]
        Class.artillery.UPGRADES_TIER_3.push("queller_AR", "forger_AR", "force_AR", "autoArtillery_AR", "foctillery_AR", "discharger_AR")
            Class.mortar.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.ordnance.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.beekeeper.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.fieldGun.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.queller_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.forger_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.force_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.autoArtillery_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.foctillery_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.discharger_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")
        //Class.minigun.UPGRADES_TIER_3
        //Class.gunner.UPGRADES_TIER_3
        Class.sprayer.UPGRADES_TIER_3.push("frother_AR", "foamer_AR", "faucet_AR", "shower_AR", "autoSprayer_AR", "stormer_AR")
            Class.redistributor.UPGRADES_TIER_3 = ["autoRedistributor"].map(x => x + "_AR")
            Class.phoenix.UPGRADES_TIER_3 = ["autoPhoenix"].map(x => x + "_AR")
            Class.atomizer.UPGRADES_TIER_3 = ["autoAtomizer"].map(x => x + "_AR")
            Class.focal.UPGRADES_TIER_3 = ["concentrator", "autoFocal"].map(x => x + "_AR")
            Class.frother_AR.UPGRADES_TIER_3 = ["autoFrother"].map(x => x + "_AR")
            Class.foamer_AR.UPGRADES_TIER_3 = ["autoFoamer"].map(x => x + "_AR")
            Class.faucet_AR.UPGRADES_TIER_3 = ["autoFaucet"].map(x => x + "_AR")
            Class.shower_AR.UPGRADES_TIER_3 = ["oversprayer", "autoShower"].map(x => x + "_AR")
            Class.autoSprayer_AR.UPGRADES_TIER_3 = ["megaAutoSprayer", "tripleAutoSprayer", "autoRedistributor", "autoPhoenix", "autoAtomizer", "autoFocal", "autoFrother", "autoFoamer", "autoFaucet", "autoShower", "autoStormer"].map(x => x + "_AR")
            Class.stormer_AR.UPGRADES_TIER_3 = ["autoStormer"].map(x => x + "_AR")
        Class.diesel_AR.UPGRADES_TIER_3 = ["jalopy_AR", "machineGunner", "foamer_AR", "dieselTrapper_AR", "polluter_AR", "autoDiesel_AR"]
            Class.polluter_AR.UPGRADES_TIER_3 = ["overdiesel"].map(x => x + "_AR")
            Class.autoDiesel_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")
        Class.machineTrapper_AR.UPGRADES_TIER_3 = ["dieselTrapper_AR", "barricade", "equalizer_AR", "frother_AR", "machineGuard_AR", "encircler_AR", "machineMech_AR", "triMachine_AR", "expeller_AR", "autoMachineTrapper_AR", "deviation_AR"]

    //Class.flankGuard.UPGRADES_TIER_2
        //Class.flankGuard.UPGRADES_TIER_3
            Class.flankGuard.UPGRADES_TIER_3.push("ternion_AR")
        //Class.hexaTank.UPGRADES_TIER_3
        Class.triAngle.UPGRADES_TIER_3.push("cockatiel_AR", "integrator_AR", "defect_AR", "quadAngle_AR")
            Class.fighter.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.booster.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            //Class.falcon.UPGRADES_TIER_3
            Class.bomber.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.autoTriAngle.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.surfer.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.eagle.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            //Class.phoenix.UPGRADES_TIER_3
            Class.vulture.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.cockatiel_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.integrator_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            //Class.defect_AR.UPGRADES_TIER_3
            Class.quadAngle_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")
        Class.auto3.UPGRADES_TIER_3.push("sniper3_AR", "crowbar_AR", "autoAuto3_AR", "combo_AR")
            Class.auto5.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.mega3.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            //Class.auto4.UPGRADES_TIER_3
            Class.banshee.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.sniper3_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.crowbar_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.autoAuto3_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            //Class.combo_AR.UPGRADES_TIER_3
        Class.trapGuard.UPGRADES_TIER_3.push("peashooter_AR", "incarcerator_AR", "mechGuard_AR", "autoTrapGuard_AR", "machineGuard_AR", "triTrapGuard_AR")
        Class.triTrapper.UPGRADES_TIER_3.push("triPen_AR", "triMech_AR", "triMachine_AR", "triTrapGuard_AR")
            Class.hexaTrapper.UPGRADES_TIER_3 = [].map(x => x + "_AR")

    Class.director.UPGRADES_TIER_2.push("directordrive_AR", "honcho_AR", "doper_AR")
        Class.director.UPGRADES_TIER_3.splice(1, 1) //remove bigCheese
            Class.director.UPGRADES_TIER_3.push("coordinator_AR")
            Class.manager.UPGRADES_TIER_3 = ["leader", "inspector", "managerdrive", "autoManager"].map(x => x + "_AR")
        Class.overseer.UPGRADES_TIER_3.push("captain_AR", "foreman_AR", "dopeseer_AR")
            Class.overseer.UPGRADES_TIER_3.push("inspector_AR", "overdoubleTwin_AR", "overshot_AR", "overassassin_AR", "overhunter_AR", "overminigun_AR", "overrifle_AR", "overmarksman_AR", "overartillery_AR", "oversprayer_AR", "overdiesel_AR", "overangle_AR", "overdestroyer_AR", "overlauncher_AR")
            Class.overtrapper.UPGRADES_TIER_3 = ["kingpin", "overmach", "autoOvertrapper", "overtrapperdrive"/*, "battletrapper", "captrapper", "foretrapper"*/, "overbuilder", "overtrapGuard", "overpen", "overmech", "overwark"].map(x => x + "_AR")
            //Class.dopeseer_AR.UPGRADES_TIER_3 = ["briskseer", "dopelord", "autoDopeseer", "dopeseerdrive", "adjurer", "mogul", "ganger"].map(x => x + "_AR")
        Class.cruiser.UPGRADES_TIER_3.push("productionist_AR", "cruiserdrive_AR", "hangar_AR", "zipper_AR", "baltimore_AR", "mosey_AR")
            Class.battleship.UPGRADES_TIER_3 = [].map(x => x + "_AR")
        Class.underseer.UPGRADES_TIER_3.push("autoUnderseer_AR", "underdrive_AR", "pentaseer_AR")
            Class.necromancer.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.maleficitor.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.infestor.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.autoUnderseer_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.underdrive_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")
            Class.pentaseer_AR.UPGRADES_TIER_3 = [].map(x => x + "_AR")
        Class.spawner.UPGRADES_TIER_3.push("megaSpawner_AR", "productionist_AR", "spawnerdrive_AR", "captain_AR", "hangar_AR", "laborer_AR", "foundry_AR", "issuer_AR")
            //Class.hangar_AR.UPGRADES_TIER_3 = ["courier", "warlord", "aerodome", "autoHangar", "megaHangar", "dirigible", "airfield", "helipad", "governer", "grinder", "barn", "reposit"].map(x => x + "_AR")
            //Class.laborer_AR.UPGRADES_TIER_3 = ["worker", "autoLaborer", "megaLaborer", "labordrive", "toiler", "grinder", "servicer", "endeavor", "slogger"].map(x => x + "_AR")
            //Class.foundry_AR.UPGRADES_TIER_3 = ["endeavor", "stocker", "foundrydrive", "megaFoundry", "fabrication", "shopper", "autoFoundry", "barn", "topBanana", "plant"].map(x => x + "_AR")
            //Class.issuer_AR.UPGRADES_TIER_3 = ["circulator", "facility", "autoIssuer", "megaIssuer", "inducer", "issuerdrive", "mogul", "reposit", "slogger", "plant"].map(x => x + "_AR")
        Class.directordrive_AR.UPGRADES_TIER_3 = ["directorstorm_AR", "overdrive", "cruiserdrive_AR", "underdrive_AR", "spawnerdrive_AR", "autoDirectordrive_AR", "honchodrive_AR", "doperdrive_AR"]
            Class.directorstorm_AR.UPGRADES_TIER_3 = ["vortex", "downpourer", "overstorm", "cruiserstorm", "understorm", "spawnerstorm", "autoDirectorstorm", "honchostorm", "doperstorm"].map(x => x + "_AR")
            Class.overdrive.UPGRADES_TIER_3 = ["overstorm", "tyrant", "overtrapperdrive", "overgunnerdrive", "bansheedrive", "autoOverdrive", "instructor", "captaindrive", "foredrive", "dopedrive"].map(x => x + "_AR")
            Class.cruiserdrive_AR.UPGRADES_TIER_3 = ["cruiserstorm", "carrierdrive", "battledrive", "fortdrive"/*, "autoCruiserdrive"*/, "prescriber", "productiondrive"/*, "helipad", "baltimoredrive", "moseydrive"*/].map(x => x + "_AR")
            Class.underdrive_AR.UPGRADES_TIER_3 = ["understorm", "necrodrive", "hexer", "infestordrive", "autoUnderdrive", "pentadrive"].map(x => x + "_AR")
            Class.spawnerdrive_AR.UPGRADES_TIER_3 = ["spawnerstorm"].map(x => x + "_AR")
        Class.honcho_AR.UPGRADES_TIER_3 = ["bigCheese", "foreman_AR", "baltimore_AR", "foundry_AR", "autoHoncho_AR", "honchodrive_AR", "junkie_AR"]
            //Class.junkie_AR.UPGRADES_TIER_3 = ["addict", "ganger", "harbor", "plant", "stoner", "junkiedrive", "autoJunkie"].map(x => x + "_AR")
        Class.doper_AR.UPGRADES_TIER_3 = ["brisker", "dopeseer", "mosey", "issuer", "junkie", "doperdrive", "autoDoper"].map(x => x + "_AR")
            //Class.brisker_AR.UPGRADES_TIER_3 = ["adderall", "briskseer", "sailor", "circulator", "briskerdrive", "addict", "autoBrisker"].map(x => x + "_AR")

    //Class.pounder.UPGRADES_TIER_2.push("volute")
        //Class.pounder.UPGRADES_TIER_3
            Class.pounder.UPGRADES_TIER_3.push("bruiser_AR")
        Class.destroyer.UPGRADES_TIER_3.push("megaTrapper_AR", "queller_AR", "autoDestroyer_AR", "hurler_AR", "slinker_AR")
        Class.builder.UPGRADES_TIER_3.push("forger_AR", "stall_AR", "fashioner_AR", "charger_AR")
        //Class.artillery.UPGRADES_TIER_3
        Class.launcher.UPGRADES_TIER_3.push("rocketeer_AR", "pitcher_AR", "cluster_AR", "projector_AR", "heaver_AR", "autoLauncher_AR", "hurler_AR", "inception_AR")
            //UPGRADES_TIER_3 = ["shaver", "bazooka", "catapult", "myriad", "leviathan", "bulker", "bombard", "python", "claimant", "incline", "autoHurler", "mongrel", "bunger", "deliverer", "slingshot"].map(x => x + "_AR")

    Class.trapper.UPGRADES_TIER_2.push("pen_AR", "mech_AR", "machineTrapper_AR", "wark_AR")
        Class.trapper.UPGRADES_TIER_3.splice(0, 1) //remove barricade
        Class.trapper.UPGRADES_TIER_3.push("megaTrapper_AR")
            Class.trapper.UPGRADES_TIER_3.push(/*"sawedOff_AR", */"tricker_AR")
        //Class.builder.UPGRADES_TIER_3
        //Class.triTrapper.UPGRADES_TIER_3
        //Class.trapGuard.UPGRADES_TIER_3
        Class.pen_AR.UPGRADES_TIER_3 = ["stall", "triPen", "encircler", "incarcerator", "operator", "cockatiel", "hutch", "interner", "autoPen"].map(x => x + "_AR")
        Class.mech_AR.UPGRADES_TIER_3 = ["engineer", "triMech_AR", "machineMech_AR", "mechGuard_AR", "operator_AR", "cog_AR", "cobbler_AR", "autoMech_AR"]
        //Class.machineTrapper_AR.UPGRADES_TIER_3
        //Class.wark_AR.UPGRADES_TIER_3

    //Class.whirlwind.UPGRADES_TIER_2
        //Class.whirlwind.UPGRADES_TIER_3
            Class.hexaWhirl.UPGRADES_TIER_3 = ["octoWhirl", "PLACEHOLDER_whirlCyclone", "PLACEHOLDER_whirlHexaTrapper", "peaceMoon", "autoHexaWhirl", "PLACEHOLDER_whirlMingler", "comboWhirl"].map(x => x + "_AR")
            Class.munition.UPGRADES_TIER_3 = ["PLACEHOLDER_whirlMortar", "PLACEHOLDER_whirlOrdnance", "PLACEHOLDER_whirlBeekeeper", "PLACEHOLDER_whirlFieldGun", "PLACEHOLDER_whirlQueller", "PLACEHOLDER_whirlForger", "schwartz", "autoMunition", "PLACEHOLDER_whirlFoctillery", "PLACEHOLDER_whirlDischarger"].map(x => x + "_AR")
            Class.whirl3.UPGRADES_TIER_3 = ["whirl5", "megaWhirl3", "whirl4", "PLACEHOLDER_whirlBanshee", "PLACEHOLDER_whirlSniper3", "whirlbar", "autoWhirl3", "comboWhirl"].map(x => x + "_AR")
            Class.whirlGuard.UPGRADES_TIER_3 = ["autoWhirlGuard", "triWhirlGuard"].map(x => x + "_AR")
            Class.prophet.UPGRADES_TIER_3 = ["PLACEHOLDER_whirlNecromancer", "PLACEHOLDER_whirlMaleficitor", "PLACEHOLDER_whirlInfestor", "autoProphet"].map(x => x + "_AR")
            Class.vortex.UPGRADES_TIER_3 = ["PLACEHOLDER_whirlFieldGun", "autoVortex"].map(x => x + "_AR")
        //Class.tornado.UPGRADES_TIER_3
            Class.megaTornado.UPGRADES_TIER_3 = ["ultraTornado"].map(x => x + "_AR")

//    Class.desmos.UPGRADES_TIER_2.splice(0, 0, "volute")
//    Class.desmos.UPGRADES_TIER_2.push("spiral", "repeater")
//        Class.desmos.UPGRADES_TIER_3 = ["bender"]
//        Class.volute.UPGRADES_TIER_3.push("oroboros", "autoVolute_AR")
//        Class.helix.UPGRADES_TIER_3.push("coil", "duplicator", "doubleHelix_AR", "autoHelix_AR")
            //Class.triplex.UPGRADES_TIER_3 = ["quintuplex_AR", "doubleTriplex_AR", "autoTriplex_AR"]
            //Class.quadruplex.UPGRADES_TIER_3 = []
            //Class.doubleHelix_AR.UPGRADES_TIER_3 = ["tripleHelix_AR", "doubleTriplex_AR", "doubleCoil_AR", "doubleDuplicator_AR", "autoDoubleHelix_AR"]
            //Class.autoHelix_AR.UPGRADES_TIER_3 = ["autoTriplex_AR", "autoQuadruplex_AR", "autoCoil_AR", "autoDuplicator_AR", "autoDoubleHelix_AR"]
//        Class.spiral.UPGRADES_TIER_3.push(/*"wrangler", */"oroboros", "cocci", /*"rocket", */"autoSpiral_AR")
            //Class.superSpiral.UPGRADES_TIER_3 = ["autoSuperSpiral_AR"]
            //Class.coil.UPGRADES_TIER_3 = ["doubleCoil_AR", "autoCoil_AR"]
            //Class.autoSpiral_AR.UPGRADES_TIER_3 = ["autoSuperSpiral_AR", "autoCoil_AR"]
//        Class.repeater.UPGRADES_TIER_3.push("autoRepeater_AR")
            //Class.iterator.UPGRADES_TIER_3 = ["autoIterator_AR"]
            //Class.duplicator.UPGRADES_TIER_3 = ["doubleDuplicator_AR", "autoDuplicator_AR"]
            //Class.autoRepeater_AR.UPGRADES_TIER_3 = ["autoIterator_AR", "autoDuplicator_AR"]

if (Config.retrograde) {
    //Class.twin.UPGRADES_TIER_2
        //Class.tripleShot.UPGRADES_TIER_3
            Class.pentaShot.UPGRADES_TIER_3.push("pentaBlaster_AR")
            Class.bentDouble.UPGRADES_TIER_3.push("doubleTriBlaster_AR")
    //Class.machineGun.UPGRADES_TIER_2
        Class.artillery.UPGRADES_TIER_3.push("doubleArtillery_AR")
            Class.munition.UPGRADES_TIER_3.push("doubleMunition_AR")
            Class.autoArtillery_AR.UPGRADES_TIER_3.push("autoDoubleArtillery_AR")
        Class.minigun.UPGRADES_TIER_3.push("doubleMinigun_AR")
            Class.autoMinigun_AR.UPGRADES_TIER_3.push("autoDoubleMinigun_AR")
        Class.sprayer.UPGRADES_TIER_3.push("doubleSprayer_AR")
            Class.redistributor.UPGRADES_TIER_3.push("doubleRedistributor_AR")
            Class.atomizer.UPGRADES_TIER_3.push("doubleAtomizer_AR")
            Class.focal.UPGRADES_TIER_3.push("sprayNSpray_AR", "doubleFocal_AR")
            Class.frother_AR.UPGRADES_TIER_3.push("doubleFrother_AR")
            Class.foamer_AR.UPGRADES_TIER_3.push("doubleFoamer_AR")
            Class.faucet_AR.UPGRADES_TIER_3.push("doubleFaucet_AR")
            Class.autoSprayer_AR.UPGRADES_TIER_3.push("autoSplasher_AR", "autoDoubleSprayer_AR")
            Class.stormer_AR.UPGRADES_TIER_3.push("doubleStormer_AR")
        Class.diesel_AR.UPGRADES_TIER_3.push("doubleDiesel_AR")
            Class.autoDiesel_AR.UPGRADES_TIER_3.push("autoDoubleDiesel_AR")
        Class.blaster.UPGRADES_TIER_3.push("volley_AR", "doubleBlaster_AR", "autoBlaster_AR")
            Class.triBlaster.UPGRADES_TIER_3 = ["pentaBlaster", "doubleTriBlaster", "autoTriBlaster"].map(x => x + "_AR")
            Class.splasher.UPGRADES_TIER_3 = ["sprayNSpray", "autoSplasher"].map(x => x + "_AR")
            Class.doubleBlaster_AR.UPGRADES_TIER_3 = ["tripleBlaster", "doubleTriBlaster", "slabNSlab", "autoDoubleBlaster"].map(x => x + "_AR")
            Class.autoBlaster_AR.UPGRADES_TIER_3 = ["megaAutoBlaster", "tripleAutoBlaster", "autoTriBlaster", "autoSplasher", "autoHalfNHalf"].map(x => x + "_AR")
        Class.gatlingGun.UPGRADES_TIER_3.push("rotaryGun_AR", "doubleGatling_AR", "gator_AR", "autoGatlingGun_AR")
            Class.accurator.UPGRADES_TIER_3 = ["accugator"].map(x => x + "_AR")
            Class.rotaryGun_AR.UPGRADES_TIER_3 = ["concentrator", "rotator"].map(x => x + "_AR")
            Class.doubleGatling_AR.UPGRADES_TIER_3 = ["tripleGatling", "doubleFocal", "slabNSlab", "autoDoubleGatling"].map(x => x + "_AR")
            Class.gator_AR.UPGRADES_TIER_3 = ["overgatling", "accugator", "rotator"].map(x => x + "_AR")
            Class.autoGatlingGun_AR.UPGRADES_TIER_3 = ["megaAutoGatlingGun", "tripleAutoGatlingGun", "autoFocal", "autoAccurator", "autoHalfNHalf"].map(x => x + "_AR")
        Class.doubleMachine.UPGRADES_TIER_3.push("doubleArtillery_AR", "doubleMinigun_AR", "doubleGunner_AR", "doubleSprayer_AR", "doubleDiesel_AR", "doubleBlaster_AR", "doubleGatling_AR", "autoDoubleMachine_AR")
            Class.doubleMachine.UPGRADES_TIER_3.push("overdoubleMachine_AR")
            Class.tripleMachine.UPGRADES_TIER_3 = ["quadMachine", "tripleArtillery", "tripleMinigun", "tripleGunner", "tripleSprayer", "tripleDiesel", "tripleBlaster", "tripleGatling", "autoTripleMachine"].map(x => x + "_AR")
            Class.halfNHalf.UPGRADES_TIER_3 = ["slabNSlab", "sprayNSpray", "autoHalfNHalf"].map(x => x + "_AR")
            Class.doubleArtillery_AR.UPGRADES_TIER_3 = ["tripleArtillery", "autoDoubleArtillery"].map(x => x + "_AR")
            Class.doubleMinigun_AR.UPGRADES_TIER_3 = ["tripleMinigun", "autoDoubleMinigun"].map(x => x + "_AR")
            Class.doubleSprayer_AR.UPGRADES_TIER_3 = ["tripleSprayer", "sprayNSpray", "doubleRedistributor", "doubleAtomizer", "doubleFocal", "doubleFrother", "doubleFoamer", "doubleFaucet", "autoDoubleSprayer", "doubleStormer"].map(x => x + "_AR")
            Class.doubleDiesel_AR.UPGRADES_TIER_3 = ["tripleDiesel", "autoDoubleDiesel"].map(x => x + "_AR")
            Class.autoDoubleMachine_AR.UPGRADES_TIER_3 = ["megaAutoDoubleMachine", "tripleAutoDoubleMachine", "autoTripleMachine", "autoHalfNHalf", "autoDoubleArtillery", "autoDoubleMinigun", "autoDoubleGunner", "autoDoubleSprayer", "autoDoubleDiesel", "autoDoubleBlaster", "autoDoubleGatling"].map(x => x + "_AR")
    //Class.director.UPGRADES_TIER_2
        //Class.overseer.UPGRADES_TIER_3
            Class.overseer.UPGRADES_TIER_3.splice(21, 0, "overblaster_AR", "overgatling_AR", "overdoubleMachine_AR")
        //Class.cruiser.UPGRADES_TIER_3
            Class.battleship.UPGRADES_TIER_3.push("doubleFaucet_AR")
    if (!Config.daily_tank == undefined && Config.daily_tank.tank == "whirlwind") {
        Class.doubleArtillery_AR.UPGRADES_TIER_3.push("doubleMunition_AR") //.splice(4, 0, "doubleMunition_AR")
    }
}

if (!Config.daily_tank == undefined && Config.daily_tank.tank == "whirlwind") {
Class.vortex_AR.LABEL = "Directive"

/*if (enable_whirlwind) { // do another check without daily_tank so we aren't duplicating
Class.basic.UPGRADES_TIER_1.push("whirlwind")
}*/
    //Class.flankGuard.UPGRADES_TIER_2
        Class.hexaTank.UPGRADES_TIER_3.splice(3, 0, "hexaWhirl")
            Class.octoTank.UPGRADES_TIER_3.push("octoWhirl_AR")
            Class.hexaTrapper.UPGRADES_TIER_3.push("PLACEHOLDER_whirlHexaTrapper_AR")
            Class.cyclone.UPGRADES_TIER_3.push("PLACEHOLDER_whirlCyclone_AR")
            Class.deathStar.UPGRADES_TIER_3.push("peaceMoon_AR")
            Class.autoHexaTank_AR.UPGRADES_TIER_3.push("autoHexaWhirl_AR")
            Class.mingler_AR.UPGRADES_TIER_3.push("PLACEHOLDER_whirlMingler_AR")
        Class.auto3.UPGRADES_TIER_3.splice(4, 0, "whirl3")
            Class.auto5.UPGRADES_TIER_3.push("whirl5_AR")
            Class.mega3.UPGRADES_TIER_3.push("megaWhirl3_AR")
            Class.auto4.UPGRADES_TIER_3.push("whirl4_AR")
            Class.banshee.UPGRADES_TIER_3.push("PLACEHOLDER_whirlBanshee_AR")
            Class.sniper3_AR.UPGRADES_TIER_3.push("PLACEHOLDER_whirlSniper3_AR")
            Class.crowbar_AR.UPGRADES_TIER_3.push("whirlbar_AR")
            Class.autoAuto3_AR.UPGRADES_TIER_3.push("autoWhirl3_AR")
            Class.combo_AR.UPGRADES_TIER_3.push("comboWhirl_AR")
        Class.trapGuard.UPGRADES_TIER_3.splice(5, 0, "whirlGuard")
    //Class.director.UPGRADES_TIER_2
        Class.underseer.UPGRADES_TIER_3.splice(3, 0, "prophet")
            Class.necromancer.UPGRADES_TIER_3.push("PLACEHOLDER_whirlNecromancer_AR")
            Class.maleficitor.UPGRADES_TIER_3.push("PLACEHOLDER_whirlMaleficitor_AR")
            Class.infestor.UPGRADES_TIER_3.push("PLACEHOLDER_whirlInfestor_AR")
            Class.autoUnderseer_AR.UPGRADES_TIER_3.push("autoProphet_AR")
            Class.underdrive_AR.UPGRADES_TIER_3.push()
            Class.pentaseer_AR.UPGRADES_TIER_3.push()
    //Class.pounder.UPGRADES_TIER_2
        Class.artillery.UPGRADES_TIER_3.splice(4, 0, "munition")
            Class.mortar.UPGRADES_TIER_3.push("PLACEHOLDER_whirlMortar_AR")
            Class.ordnance.UPGRADES_TIER_3.push("PLACEHOLDER_whirlOrdnance_AR")
            Class.beekeeper.UPGRADES_TIER_3.push("PLACEHOLDER_whirlBeekeeper_AR")
            Class.fieldGun.UPGRADES_TIER_3.push("PLACEHOLDER_whirlFieldGun_AR")
            Class.queller_AR.UPGRADES_TIER_3.push("PLACEHOLDER_whirlQueller_AR")
            Class.forger_AR.UPGRADES_TIER_3.push("PLACEHOLDER_whirlForger_AR")
            Class.force_AR.UPGRADES_TIER_3.push("schwartz_AR")
            Class.autoArtillery_AR.UPGRADES_TIER_3.push("autoMunition_AR")
            Class.foctillery_AR.UPGRADES_TIER_3.push("PLACEHOLDER_whirlFoctillery_AR")
            Class.discharger_AR.UPGRADES_TIER_3.push("PLACEHOLDER_whirlDischarger_AR")
        Class.launcher.UPGRADES_TIER_3.splice(5, 0, "vortex")
}

if (integrate_healers) {
    Class.basic.UPGRADES_TIER_2.push("healer")
            Class.smasher.UPGRADES_TIER_3.push("physician_AR")
            Class.single.UPGRADES_TIER_3.push("renovater_AR")
        Class.twin.UPGRADES_TIER_3.push("nurse_AR")
            Class.doubleTwin.UPGRADES_TIER_3.push("clinician_AR")
            Class.tripleShot.UPGRADES_TIER_3.push("paramedic_AR")
            Class.gunner.UPGRADES_TIER_4.push("therapist_AR")
        Class.sniper.UPGRADES_TIER_3.push("medic")
            Class.assassin.UPGRADES_TIER_3.push("intern_AR")
            Class.hunter.UPGRADES_TIER_3.push("injection_AR")
            Class.rifle.UPGRADES_TIER_3.push("ointment_AR")
        Class.machineGun.UPGRADES_TIER_3 = ["psychiatrist_AR"]
            Class.minigun.UPGRADES_TIER_3.push("actuary_AR")
        Class.flankGuard.UPGRADES_TIER_3.push("triHealer_AR")
            Class.hexaTank.UPGRADES_TIER_3.push("hexaHealer_AR")
            Class.triAngle.UPGRADES_TIER_3.push("ambulance_AR")
            Class.auto3.UPGRADES_TIER_3.push("healer3_AR")
        Class.director.UPGRADES_TIER_3.push("soother_AR")
            Class.cruiser.UPGRADES_TIER_3.push("antidote_AR")
            Class.spawner.UPGRADES_TIER_3.push("medicare_AR")
            Class.honcho.UPGRADES_TIER_3.push("doctor_AR")
        Class.pounder.UPGRADES_TIER_3.push("analyzer_AR")
            Class.destroyer.UPGRADES_TIER_3.push("accountant_AR")
            Class.artillery.UPGRADES_TIER_3.push("guru_AR")
            Class.launcher.UPGRADES_TIER_3.push("clerk_AR")
        Class.trapper.UPGRADES_TIER_3.push("scientist_AR")
            Class.builder.UPGRADES_TIER_3.push("surgeon_AR")
            Class.triTrapper.UPGRADES_TIER_3.push("chemist_AR")
            Class.trapGuard.UPGRADES_TIER_3.push("professor_AR")
            Class.pen_AR.UPGRADES_TIER_3.push("scribble_AR")
        Class.desmos.UPGRADES_TIER_3.push("recalibrator_AR")
}

} else {
Class.autoDoubleFlank_AR.LABEL = "Auto-Double Flank Twin"
Class.autoTriple_AR.LABEL = "Auto-Triple Twin"
Class.dopedrive_AR.LABEL = "Dopeseerdrive"
Class.infestor.SHAPE = 4
Class.infestordrive_AR.SHAPE = 4
Class.renovator_AR.LABEL = "Renovater"
Class.vulture.LABEL = "Taser"
//Class.genericEntity.LABEL = "Deadeye"
//Class.genericEntity.LABEL = "Nimrod"
}
