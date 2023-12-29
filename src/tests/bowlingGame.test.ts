// import { calculateBowlingScore } from '../core/bowlingGame';

class BowlingGame {
	rolls: number[] = [];
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

	// it('calculate the score for a given gutter game', () => {
	// })
});
