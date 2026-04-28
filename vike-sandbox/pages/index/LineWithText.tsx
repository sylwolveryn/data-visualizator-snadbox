type Props = {
    text: string
    layer: string
}

export const LineWithText = ({ text, layer }: Props) => {
    return (
            <div
                    className={`line-with-text line-with-text-${layer}`}
                    data-content={text}
            >
            </div>
    )
}

