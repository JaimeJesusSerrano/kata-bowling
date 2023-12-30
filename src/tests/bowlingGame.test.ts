import BowlingGame from '../core/bowlingGame';

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

	it('calculate the score for a given strike and some extra ball', () => {
		game.roll(10);
		game.roll(2);
		game.roll(3);
		rollMany(16, 0);
		expect(game.calculateTotalScore()).toBe(20);
	});

	it('calculate the score for a given perfect game', () => {
		rollMany(12, 10);
		expect(game.calculateTotalScore()).toBe(300);
	});

	function rollMany(times: number, pins: number) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		Array.from({ length: times }).forEach((_) => game.roll(pins));
	}
});
