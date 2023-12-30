export class BowlingGame {
	private readonly MAX_SCORE_PER_FRAME = 10;
	private readonly TOTAL_FRAMES = 10;

	private rolls: number[] = [];

	calculateTotalScore() {
		const totalThrows = this.rolls.length;

		let score = 0;
		let currentFrame = 0;

		for (let i = 0; i < totalThrows && currentFrame !== this.TOTAL_FRAMES; i++, currentFrame++) {
			const currentRoll: number = this.rolls[i];

			const isStrike = this.isStrike(i);
			if (isStrike) {
				score += this.getStrikeScore(i);
				continue;
			}

			const isSpare = this.isSpare(i);
			if (isSpare) {
				score += this.getSpareScore(i);
				i++;
				continue;
			}

			score += currentRoll + (this.rolls[i + 1] || 0);
			i++;
		}

		return score;
	}

	roll(pins: number) {
		this.rolls.push(pins);
	}

	private isSpare(frame: number) {
		return this.rolls[frame] + this.rolls[frame + 1] === this.MAX_SCORE_PER_FRAME;
	}

	private isStrike(frame: number) {
		return this.rolls[frame] === this.MAX_SCORE_PER_FRAME;
	}

	private getSpareScore(frame: number) {
		const nextFrame = this.rolls[frame + 1] || 0;
		const nextNextFrame = this.rolls[frame + 2] || 0;
		return this.rolls[frame] + nextFrame + nextNextFrame;
	}

	private getStrikeScore(frame: number) {
		const nextFrame = this.rolls[frame + 1] || 0;
		const nextNextFrame = this.rolls[frame + 2] || 0;
		return this.rolls[frame] + nextFrame + nextNextFrame;
	}
}

export default BowlingGame;
