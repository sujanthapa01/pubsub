import {Module} from "@nestjs/common"
import {GuidelineService} from "./guideline.service"

@Module({
    providers:[GuidelineService]
})

export class GuidelineModule {}