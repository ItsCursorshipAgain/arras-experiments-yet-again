module.exports = {
// makeAuto
	megaAuto: {type: "megaAutoTurret", size: 12},
	tripleAuto: {size: 6.5, x: 5.2, angle: 0, total: 3},
	pentaAuto: {size: 5.2, x: 6.5, angle: 0, total: 5},
	heptaAuto: {size: 4, x: 6.5, angle: 0, total: 7},

// makeDrive
	swarmDrive: {hatType: "triangleHat", hatSize: 8, hatAngle: 180},

// makeOver
	hybrid: {count: 1, independent: true, cycle: false},
	hybridBehind: {count: 1, independent: true, cycle: false, inFront: false},
	sideOver: {angle: 90},
	cross: {count: 3, angle: 90},

// makeWhirlwind
	prophet: {satelliteType: "squareSatellite"},

}
