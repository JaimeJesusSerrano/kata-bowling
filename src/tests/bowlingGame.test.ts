// import { calculateBowlingScore } from '../core/bowlingGame';

class BowlingGame {
	rolls: number[] = [];

	calculateTotalScore() {
		return this.rolls.reduce((previous, current) => previous + current, 0);
	}

	roll(pins: number) {
		this.rolls.push(pins);
	}
}

describe('The Bowling Game', () => {
	let game: BowlingGame;

	beforeEach(() => {
		game = new BowlingGame();
	});

	it('should be able to create a bowling game', () => {
		expect(game).toBeInstanceOf(BowlingGame);
	});

	it('should be able to roll a ball', () => {
		game.roll(0);
		expect(game.rolls).toEqual([0]);
	});

	it('calculate the score for a given gutter all zeros game', () => {
		rollMany(20, 0);
		expect(game.calculateTotalScore()).toBe(0);
	});

	it('calculate the score for a given gutter all ones game', () => {
		rollMany(20, 1);
		expect(game.calculateTotalScore()).toBe(20);
	});

	function rollMany(times: number, pins: number) {
		Array.from({ length: times }).forEach((_) => game.roll(pins));
	}
});
