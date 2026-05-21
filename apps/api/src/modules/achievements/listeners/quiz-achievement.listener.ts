import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class QuizAchievementListener {
    constructor(private readonly achievementService: AchievementService) {}

    @OnEvent('quiz.completed')
    async handleQuizCompletedEvent(payload {
        userId,
        quizId,
        score,
        totalCompleted,
    }: {
        userId: string;
        quizId: string;
        score: number;
        totalCompleted: number;
    }) {
        const { userId, totalCompleted } = payload

        await this.achievementService.checkAndUnlock(
            userId,
            'first_quiz',
            totalCompleted >= 1
        )
    }
}