export class BowlingGame {
	TOTAL_BOWLS = 10;
	DOUBLE_VALUE_TIMES_IF_STRIKE = 2;
	DOUBLE_VALUE_TIMES_IF_SPARE = 1;
	rolls: number[] = [];

	calculateTotalScore() {
		const totalThrows = this.rolls.length;

		let doubleValueTimes = 0;
		let score = 0;

		for (let i = 0; i < totalThrows; i++) {
			const currentRoll: number = this.rolls[i];
			const nextRoll: number | undefined = this.rolls[i + 1];

			score = this.getNewScore(score, currentRoll, doubleValueTimes > 0);
			doubleValueTimes = this.decreaseDoubleValueTimes(doubleValueTimes);

			const isSpare = this.isSpare(currentRoll, nextRoll);
			if (isSpare) {
				score = this.getNewScore(score, nextRoll, doubleValueTimes > 0);
				doubleValueTimes = this.decreaseDoubleValueTimes(doubleValueTimes);
				i++;
			}

			doubleValueTimes = this.getDoubleValueTimes(currentRoll, nextRoll, doubleValueTimes);
		}

		return score;
	}

	roll(pins: number) {
		this.rolls.push(pins);
	}

	private getNewScore(score: number, newValue: number, isDoubleValue: boolean) {
		return score + (isDoubleValue ? newValue * 2 : newValue);
	}

	private decreaseDoubleValueTimes(doubleValueTimes: number) {
		return doubleValueTimes ? doubleValueTimes - 1 : 0;
	}

	private getDoubleValueTimes(currentRoll: number, nextRoll: number, doubleValueTimes: number) {
		const isStrike = this.isStrike(currentRoll);
		if (isStrike) {
			return this.DOUBLE_VALUE_TIMES_IF_STRIKE;
		}

		const isSpare = this.isSpare(currentRoll, nextRoll);
		if (isSpare) {
			return this.DOUBLE_VALUE_TIMES_IF_SPARE;
		}

		return doubleValueTimes;
	}

	private isSpare(currentRoll: number, nextRoll: number) {
		return currentRoll < this.TOTAL_BOWLS && nextRoll < this.TOTAL_BOWLS && currentRoll + nextRoll === this.TOTAL_BOWLS;
	}

	private isStrike(currentRoll: number) {
		return currentRoll === this.TOTAL_BOWLS;
	}
}

export default BowlingGame;
