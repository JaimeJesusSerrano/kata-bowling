export class BowlingGame {
	private readonly MAX_SCORE_PER_FRAME = 10;
	private readonly TOTAL_FRAMES = 10;

	private rolls: number[] = [];

	calculateTotalScore() {
		const totalThrows = this.rolls.length;

		let score = 0;
		let currentFrame = 0;

		for (let i = 0; i < totalThrows && currentFrame !== this.TOTAL_FRAMES; i++, currentFrame++) {
			score += this.calculateNextScoreByThrow(i);

			const isStrike = this.isStrike(i);
			// If there is not strike we need two throws to finish the frame
			if (!isStrike) {
				i++;
			}
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

	private getBasicScoreByThrow(frame: number) {
		const nextFrame = this.rolls[frame + 1] || 0;
		return this.rolls[frame] + nextFrame;
	}

	private getSpareScoreByThrow(frame: number) {
		const nextFrame = this.rolls[frame + 1] || 0;
		const nextNextFrame = this.rolls[frame + 2] || 0;
		return this.rolls[frame] + nextFrame + nextNextFrame;
	}

	private getStrikeScoreByThrow(frame: number) {
		const nextFrame = this.rolls[frame + 1] || 0;
		const nextNextFrame = this.rolls[frame + 2] || 0;
		return this.rolls[frame] + nextFrame + nextNextFrame;
	}

	private calculateNextScoreByThrow(frame: number) {
		const isStrike = this.isStrike(frame);
		if (isStrike) {
			return this.getStrikeScoreByThrow(frame);
		}

		const isSpare = this.isSpare(frame);
		if (isSpare) {
			return this.getSpareScoreByThrow(frame);
		}

		return this.getBasicScoreByThrow(frame);
	}
}

export default BowlingGame;
