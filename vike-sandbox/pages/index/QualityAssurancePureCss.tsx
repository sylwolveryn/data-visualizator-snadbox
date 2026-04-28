import { LineWithText } from './LineWithText'

const colors = [
    'rgba(47, 47, 228, .7)',
]

export const QualityAssurancePureCss = () => {
    return (
            <div className="container">
                <div className="donut layer0">
                    <div className="donut-default"></div>
                    <LineWithText layer={"0"} text={"SAST"} />
                    <div className="donut-text">
                        <span>Culture / processes</span>
                    </div>
                    <div className="donut-case"></div>
                </div>
                <div className="donut layer1">
                    <div className="donut-default"></div>
                    <LineWithText layer={"1"} text={"Tests within"} />
                    <div className="donut-case"></div>
                </div>
                <div className="donut layer2">
                    <div className="donut-default"></div>
                    <LineWithText layer={"2"} text={"Piggyback Tests"} />
                    <div className="donut-case"></div>
                </div>
                <div className="donut layer3">
                    <div className="donut-default"></div>
                    <LineWithText layer={"3"} text={"IOV"} />
                    <div className="donut-case"></div>
                </div>
            </div>
    )
}

