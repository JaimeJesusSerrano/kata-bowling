// import { calculateBowlingScore } from '../core/bowlingGame';

class BowlingGame {
	TOTAL_BOWLS = 10;
	rolls: number[] = [];

	calculateTotalScore() {
		const totalThrows = this.rolls.length;
		let score = 0;
		let isDoubleScore = false;

		for (let i = 0; i < totalThrows; i++) {
			const currentRoll = this.rolls[i];
			const previousRoll = i === 0 ? undefined : this.rolls[i - 1];

			if (isDoubleScore) {
				score += currentRoll * 2;
				isDoubleScore = false;
			} else {
				score += currentRoll;
			}

			if (currentRoll === this.TOTAL_BOWLS || (previousRoll && previousRoll + currentRoll === this.TOTAL_BOWLS)) {
				isDoubleScore = true;
			}
		}

		return score;
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

	it('calculate the score for a given spare and extra ball', () => {
		game.roll(5);
		game.roll(5);
		game.roll(5);
		rollMany(17, 0);
		expect(game.calculateTotalScore()).toBe(20);
	});

	function rollMany(times: number, pins: number) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		Array.from({ length: times }).forEach((_) => game.roll(pins));
	}
});
