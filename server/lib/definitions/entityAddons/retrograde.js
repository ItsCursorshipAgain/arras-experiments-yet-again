const {combineStats, makeAuto, makeMenu, makeOver, makeWhirlwind, weaponArray, weaponMirror, weaponStack} = require('../facilitators.js')
const {base, statnames} = require('../constants.js')
const g = require('../gunvals.js')
const preset = require('../presets.js')

// Settings
const arras_mode = false // Set to true to make tank designs closer to how they were in arras.io's implementation of Retrograde.
const replace_newer_classes = false // Set to true to make the class tree replace certain entries with Retrograde equivalents

// Tier 2
if (arras_mode) {
    Class.blaster.GUNS = [
        {
            POSITION: {
                LENGTH: 7.5,
                WIDTH: 12,
                ASPECT: 1.2,
                X: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, { size: 0.92 }, g.blaster]),
                TYPE: "bullet"
            }
        }
    ]
    Class.doubleMachine.LABEL = "Machine Flank"
    Class.gatlingGun.GUNS = [
        {
            POSITION: {
                LENGTH: 24,
                WIDTH: 10,
                ASPECT: 1.4
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.focal]),
                TYPE: "bullet"
            }
        }
    ]
    Class.rifle.GUNS = [
        {
            POSITION: {
                LENGTH: 22,
                WIDTH: 7
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 14,
                WIDTH: 10.5
            }
        }
    ]
}

// Tier 3
Class.doubleArtillery_RG_AR = {
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
Class.doubleBlaster_RG_AR = {
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
Class.doubleDiesel_RG_AR = {
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
Class.doubleGatling_RG_AR = {
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
Class.doubleMinigun_RG_AR = {
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
Class.doubleSprayer_RG_AR = {
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
Class.rifleGuard_RG = {
    PARENT: "genericTank",
    LABEL: "Rifle Guard",
    DANGER: 8,
    BODY: {
        FOV: base.FOV * 1.225
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 22,
                WIDTH: 7
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 14,
                WIDTH: 10.5
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
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap"
            }
        }
    ]
}
Class.sniperRifle_RG = {
    PARENT: "genericTank",
    LABEL: "Sniper Rifle",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.35
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 30,
                WIDTH: 7
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin, g.rifle]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 14,
                WIDTH: 10.5
            }
        }
    ]
}
Class.spreadRifle_RG = {
    PARENT: "genericTank",
    LABEL: "Spread Rifle",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.225
    },
    GUNS: [
        ...weaponMirror([{
            POSITION: {
                LENGTH: 11,
                WIDTH: 4,
                X: 6,
                Y: 4,
                DELAY: 1
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.crossbow, { recoil: 0.5 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 11,
                WIDTH: 4,
                X: 3,
                Y: 5,
                DELAY: 2/3
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.crossbow, { recoil: 0.5 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 11,
                WIDTH: 4,
                Y: 6,
                DELAY: 1/3
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.crossbow, { recoil: 0.5 }]),
                TYPE: "bullet"
            }
        }]),
        {
            POSITION: {
                LENGTH: 22,
                WIDTH: 7
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 14,
                WIDTH: 10.5
            }
        }
    ]
}
if (arras_mode) {
    Class.accurator.GUNS = [
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 0.1,
                ASPECT: -10,
                X: 24
            }
        },
        {
            POSITION: {
                LENGTH: 24,
                WIDTH: 10,
                ASPECT: 1.4
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.focal]),
                TYPE: "speedBullet"
            }
        }
    ]
    Class.doubleArtillery_RG_AR.LABEL = "Artillery Flank"
    Class.doubleBlaster_RG_AR.LABEL = "Blaster Flank"
    Class.doubleDiesel_RG_AR.LABEL = "Diesel Flank"
    Class.doubleGatling_RG_AR.LABEL = "Gatling Flank"
    Class.doubleSprayer_RG_AR.LABEL = "Sprayer Flank"
    Class.halfNHalf.GUNS = [
        {
            POSITION: {
                LENGTH: 24,
                WIDTH: 10,
                ASPECT: 1.4
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.focal]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 10,
                ASPECT: 1.4,
                X: 8,
                ANGLE: 180
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, { size: 0.92 }]),
                TYPE: "bullet"
            }
        }
    ]
    Class.splasher.GUNS = [
        {
            POSITION: {
                LENGTH: 21,
                WIDTH: 7
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.lowPower, g.pelleter, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 10,
                WIDTH: 10,
                ASPECT: 1.4,
                X: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, { size: 0.92 }, g.blaster]),
                TYPE: "bullet"
            }
        }
    ]
    Class.triBlaster.GUNS = [
        ...weaponMirror({
            POSITION: {
                LENGTH: 5,
                WIDTH: 12,
                ASPECT: 1.2,
                X: 8,
                ANGLE: 25,
                DELAY: 0.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, { size: 0.92 }, g.blaster, g.tripleShot, { recoil: 0.2 }]),
                TYPE: "bullet"
            }
        }),
        {
            POSITION: {
                LENGTH: 7.5,
                WIDTH: 12,
                ASPECT: 1.2,
                X: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, { size: 0.92 }, g.blaster, g.tripleShot]),
                TYPE: "bullet"
            }
        }
    ]
    Class.tripleMachine.LABEL = "Machine Triple"
}

// Tier 4
Class.autoAccurator_RG_AR = makeAuto("accurator")
Class.autoDoubleArtillery_RG_AR = makeAuto("doubleArtillery_RG_AR")
Class.autoDoubleBlaster_RG_AR = makeAuto("doubleBlaster_RG_AR")
Class.autoDoubleDiesel_RG_AR = makeAuto("doubleDiesel_RG_AR")
Class.autoDoubleGatling_RG_AR = makeAuto("doubleGatling_RG_AR")
Class.autoDoubleMinigun_RG_AR = makeAuto("doubleMinigun_RG_AR")
Class.autoDoubleSprayer_RG_AR = makeAuto("doubleSprayer_RG_AR")
Class.autoHalfNHalf_RG_AR = makeAuto("halfNHalf")
Class.autoSplasher_RG_AR = makeAuto("splasher")
Class.autoTriBlaster_RG_AR = makeAuto("triBlaster")
Class.autoTripleMachine_RG_AR = makeAuto("tripleMachine")
Class.doubleAtomizer_RG_AR = {
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
Class.doubleFaucet_RG_AR = {
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
Class.doubleFocal_RG_AR = {
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
Class.doubleFoamer_RG_AR = {
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
Class.doubleFrother_RG_AR = {
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
Class.doubleMunition_RG_AR = makeWhirlwind("doubleArtillery_RG_AR", {label: "Double Munition"})
Class.doubleRedistributor_RG_AR = {
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
Class.doubleStormer_RG_AR = {
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
Class.doubleTriBlaster_RG_AR = {
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
Class.megaAutoBlaster_RG_AR = makeAuto("blaster", "Mega Auto-Blaster", preset.megaAuto)
Class.megaAutoDoubleMachine_RG_AR = makeAuto("doubleMachine", "Mega Auto-Double Machine", preset.megaAuto)
Class.megaAutoGatlingGun_RG_AR = makeAuto("gatlingGun", "Mega Auto-Gatling Gun", preset.megaAuto)
Class.overblaster_RG_AR = makeOver("blaster")
Class.overdoubleMachine_RG_AR = makeOver("doubleMachine", "Overdouble Machine", {angle: 90})
Class.overgatling_RG_AR = makeOver("gatlingGun", "Overgatling")
Class.pentaBlaster_RG_AR = {
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
Class.quadMachine_RG_AR = {
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
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, { size: 0.92 }, g.flankGuard, g.flankGuard]),
            TYPE: "bullet"
        }
    }, 4)
}
Class.slabNSlab_RG_AR = {
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
Class.sprayNSpray_RG_AR = {
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
Class.tripleArtillery_RG_AR = {
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
Class.tripleAutoBlaster_RG_AR = makeAuto("blaster", "Triple Auto-Blaster", preset.tripleAuto)
Class.tripleAutoDoubleMachine_RG_AR = makeAuto("doubleMachine", "Triple Auto-Double Machine", preset.tripleAuto)
Class.tripleAutoGatlingGun_RG_AR = makeAuto("gatlingGun", "Triple Auto-Gatling Gun", preset.tripleAuto)
Class.tripleBlaster_RG_AR = {
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
Class.tripleDiesel_RG_AR = {
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
Class.tripleGatling_RG_AR = {
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
Class.tripleMinigun_RG_AR = {
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
Class.tripleSprayer_RG_AR = {
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
if (arras_mode) {
    Class.megaAutoDoubleMachine_RG_AR.LABEL = "Mega Auto-Machine Flank"
    Class.overdoubleMachine_RG_AR.LABEL = "Overmachine Flank"
    Class.tripleAutoDoubleMachine_RG_AR.LABEL = "Triple Auto-Machine Flank"
    Class.tripleBlaster_RG_AR.LABEL = "Blaster Triple"
    Class.tripleDiesel_RG_AR.LABEL = "Diesel Triple"
    Class.tripleGatling_RG_AR.LABEL = "Gatling Triple"
    Class.tripleSprayer_RG_AR.LABEL = "Sprayer Triple"
    Class.quadMachine_RG_AR.LABEL = "Machine Quadruple"
}

// break if original tree is enabled
for (let i = 0; i < Class.sprayer.UPGRADES_TIER_3.length; i++) {
    let string = Class.sprayer.UPGRADES_TIER_3[i];
    if (string === "duster_AR") {
        return
    }
}
/*
// Class Tree
Class.rifle_old.UPGRADES_TIER_3 = ["sniperRifle", "rifleGuard", "spreadRifle"].map(x => x + "_RG")
if (arras_mode) {
    Class.blaster.UPGRADES_TIER_3 = ["triBlaster", "splasher"].map(x => x + "_RG")
}
if (Config.retrograde && Config.arms_race) {
    //Class.twin.UPGRADES_TIER_2
        //Class.tripleShot.UPGRADES_TIER_3
            Class.pentaShot.UPGRADES_TIER_3.push("pentaBlaster_RG_AR")
            Class.bentDouble.UPGRADES_TIER_3.push("doubleTriBlaster_RG_AR")
    //Class.machineGun.UPGRADES_TIER_2
        Class.artillery.UPGRADES_TIER_3.push("doubleArtillery_RG_AR")
            Class.munition.UPGRADES_TIER_3.push("doubleMunition_RG_AR")
            Class.autoArtillery_AR.UPGRADES_TIER_3.push("autoDoubleArtillery_RG_AR")
        Class.minigun.UPGRADES_TIER_3.push("doubleMinigun_RG_AR")
            Class.autoMinigun_AR.UPGRADES_TIER_3.push("autoDoubleMinigun_RG_AR")
        Class.sprayer.UPGRADES_TIER_3.push("doubleSprayer_RG_AR")
            Class.redistributor.UPGRADES_TIER_3.push("doubleRedistributor_RG_AR")
            Class.atomizer.UPGRADES_TIER_3.push("doubleAtomizer_RG_AR")
            Class.focal.UPGRADES_TIER_3.push("sprayNSpray_RG_AR", "doubleFocal_RG_AR")
            Class.frother_AR.UPGRADES_TIER_3 = ["doubleFrother_RG"].map(x => x + "_AR")
            Class.foamer_AR.UPGRADES_TIER_3 = ["doubleFoamer_RG"].map(x => x + "_AR")
            Class.faucet_AR.UPGRADES_TIER_3 = ["doubleFaucet_RG"].map(x => x + "_AR")
            Class.autoSprayer_AR.UPGRADES_TIER_3.push("autoDoubleSprayer_RG_AR")
            Class.stormer_AR.UPGRADES_TIER_3.push("doubleStormer_RG_AR")
        Class.diesel_AR.UPGRADES_TIER_3.push("doubleDiesel_RG_AR")
            Class.autoDiesel_AR.UPGRADES_TIER_3.push("autoDoubleDiesel_RG_AR")
        Class.blaster.UPGRADES_TIER_3.push("volley_AR", "halfNHalf", "doubleBlaster_RG_AR", "autoBlaster_RG_AR")
            Class.triBlaster.UPGRADES_TIER_3 = ["pentaBlaster", "doubleTriBlaster", "autoTriBlaster"].map(x => x + "_RG_AR")
            Class.splasher.UPGRADES_TIER_3 = ["sprayNSpray", "autoSplasher"].map(x => x + "_RG_AR")
            Class.doubleBlaster_RG_AR.UPGRADES_TIER_3 = ["tripleBlaster", "doubleTriBlaster", "slabNSlab", "autoDoubleBlaster"].map(x => x + "_RG_AR")
            Class.autoBlaster_RG_AR.UPGRADES_TIER_3 = ["megaAutoBlaster", "tripleAutoBlaster", "autoTriBlaster", "autoSplasher", "autoHalfNHalf"].map(x => x + "_RG_AR")
        Class.gatlingGun.UPGRADES_TIER_3.push("focal", "doubleGatling_RG_AR", "gator_RG_AR", "autoGatlingGun_RG_AR")
            Class.doubleGatling_RG_AR.UPGRADES_TIER_3 = ["tripleGatling", "doubleFocal", "slabNSlab", "autoDoubleGatling"].map(x => x + "_RG_AR")
            Class.gator_RG_AR.UPGRADES_TIER_3 = ["overgatling"].map(x => x + "_RG_AR")
            Class.autoGatlingGun_RG_AR.UPGRADES_TIER_3 = ["megaAutoGatlingGun_RG", "tripleAutoGatlingGun_RG", "autoAccurator_RG", "autoHalfNHalf_RG", "autoFocal"].map(x => x + "_AR")
        Class.doubleMachine.UPGRADES_TIER_3.push("doubleArtillery_RG_AR", "doubleMinigun_RG_AR", "doubleGunner_AR", "doubleSprayer_RG_AR", "doubleDiesel_RG_AR", "doubleBlaster_RG_AR", "doubleGatling_RG_AR", "autoDoubleMachine_RG_AR")
            Class.doubleMachine.UPGRADES_TIER_3.push("overdoubleMachine_RG_AR")
            Class.tripleMachine.UPGRADES_TIER_3 = ["quadMachine_RG", "tripleArtillery_RG", "tripleMinigun_RG", "tripleGunner", "tripleSprayer_RG", "tripleDiesel_RG", "tripleBlaster_RG", "tripleGatling_RG", "autoTripleMachine_RG"].map(x => x + "_AR")
            Class.halfNHalf.UPGRADES_TIER_3 = ["slabNSlab", "sprayNSpray", "autoHalfNHalf"].map(x => x + "_RG_AR")
            Class.doubleArtillery_RG_AR.UPGRADES_TIER_3 = ["tripleArtillery", "autoDoubleArtillery"].map(x => x + "_RG_AR")
            Class.doubleMinigun_RG_AR.UPGRADES_TIER_3 = ["tripleMinigun", "autoDoubleMinigun"].map(x => x + "_RG_AR")
            Class.doubleSprayer_RG_AR.UPGRADES_TIER_3 = ["tripleSprayer", "sprayNSpray", "doubleRedistributor", "doubleAtomizer", "doubleFocal", "doubleFrother", "doubleFoamer", "doubleFaucet", "autoDoubleSprayer", "doubleStormer"].map(x => x + "_RG_AR")
            Class.doubleDiesel_RG_AR.UPGRADES_TIER_3 = ["tripleDiesel", "autoDoubleDiesel"].map(x => x + "_RG_AR")
            Class.autoDoubleMachine_RG_AR.UPGRADES_TIER_3 = ["megaAutoDoubleMachine_RG", "tripleAutoDoubleMachine_RG", "autoTripleMachine_RG", "autoHalfNHalf_RG", "autoDoubleArtillery_RG", "autoDoubleMinigun_RG", "autoDoubleGunner", "autoDoubleSprayer_RG", "autoDoubleDiesel_RG", "autoDoubleBlaster_RG", "autoDoubleGatling_RG"].map(x => x + "_AR")
    //Class.director.UPGRADES_TIER_2
        //Class.overseer.UPGRADES_TIER_3
            Class.overseer.UPGRADES_TIER_3.splice(21, 0, "overblaster_RG_AR", "overgatling_RG_AR", "overdoubleMachine_RG_AR")
        //Class.cruiser.UPGRADES_TIER_3
            Class.battleship.UPGRADES_TIER_3.push("doubleFaucet_RG_AR")
    if (!Config.daily_tank == undefined && Config.daily_tank.tank == "whirlwind") {
        Class.doubleArtillery_RG_AR.UPGRADES_TIER_3.push("doubleMunition_RG_AR") //.splice(4, 0, "doubleMunition_RG_AR")
    }
}
*/

if (!Config.arms_race && replace_newer_classes) {
    for (let i = 0; i < Class.twin.UPGRADES_TIER_3.length; i++) {
        let string = Class.twin.UPGRADES_TIER_3[i];
        if (string === "bulwark") {
            Class.twin.UPGRADES_TIER_3.splice(i, 1)
            Class.doubleTwin.UPGRADES_TIER_3.push("bulwark_old")
        }
        let string2 = Class.twin.UPGRADES_TIER_3[i];
        if (string2 === "musket") {
            Class.twin.UPGRADES_TIER_3.splice(i, 1)
        }
    }
    for (let i = 0; i < Class.doubleTwin.UPGRADES_TIER_3.length; i++) {
        let string = Class.doubleTwin.UPGRADES_TIER_3[i];
        if (string === "tripleTwin") {
            Class.doubleTwin.UPGRADES_TIER_3.splice(i, 1, "quadTwin_AR")
            Class.menu_unused.UPGRADES_TIER_0.push("tripleTwin")
        }
    }
    for (let i = 0; i < Class.gunner.UPGRADES_TIER_3.length; i++) {
        let string = Class.gunner.UPGRADES_TIER_3[i];
        if (string === "cyclone") {
            Class.gunner.UPGRADES_TIER_3.splice(i, 1)
        }
    }
    for (let i = 0; i < Class.sniper.UPGRADES_TIER_2.length; i++) {
        let string = Class.sniper.UPGRADES_TIER_2[i];
        if (string === "rifle") {
            Class.sniper.UPGRADES_TIER_2.splice(i, 1, "rifle_old")
            Class.menu_unused.UPGRADES_TIER_0.push("rifle")
        }
    }
    for (let i = 0; i < Class.sniper.UPGRADES_TIER_3.length; i++) {
        let string = Class.sniper.UPGRADES_TIER_3[i];
        if (string === "bushwhacker") {
            Class.sniper.UPGRADES_TIER_3.splice(i, 1)
            Class.menu_unused.UPGRADES_TIER_0.push("bushwhacker")
        }
    }
    for (let i = 0; i < Class.marksman.UPGRADES_TIER_3.length; i++) {
        let string = Class.marksman.UPGRADES_TIER_3[i];
        if (string === "revolver") {
            Class.marksman.UPGRADES_TIER_3.splice(i, 1)
        }
    }
    for (let i = 0; i < Class.machineGun.UPGRADES_TIER_2.length; i++) {
        let string = Class.machineGun.UPGRADES_TIER_2[i];
        if (string === "sprayer") {
            Class.machineGun.UPGRADES_TIER_2.splice(i, 1)
            Class.menu_unused.UPGRADES_TIER_0.push("sprayer")
        }
    }
    for (let i = 0; i < Class.flankGuard.UPGRADES_TIER_3.length; i++) {
        let string = Class.flankGuard.UPGRADES_TIER_3[i];
        if (string === "tripleTwin") {
            Class.flankGuard.UPGRADES_TIER_3.splice(i, 1)
        }
    }
    for (let i = 0; i < Class.hexaTank.UPGRADES_TIER_3.length; i++) {
        let string = Class.hexaTank.UPGRADES_TIER_3[i];
        if (string === "cyclone") {
            Class.hexaTank.UPGRADES_TIER_3.splice(i, 1, "tornado_RG")
            Class.menu_unused.UPGRADES_TIER_0.push("cyclone")
        }
    }
    for (let i = 0; i < Class.triAngle.UPGRADES_TIER_3.length; i++) {
        let string = Class.triAngle.UPGRADES_TIER_3[i];
        if (string === "phoenix") {
            Class.triAngle.UPGRADES_TIER_3.splice(i, 1)
        }
    }
    for (let i = 0; i < Class.trapGuard.UPGRADES_TIER_3.length; i++) {
        let string = Class.trapGuard.UPGRADES_TIER_3[i];
        if (string === "bulwark") {
            Class.trapGuard.UPGRADES_TIER_3.splice(i, 1)
            Class.menu_unused.UPGRADES_TIER_0.push("bulwark")
        }
    }
}
