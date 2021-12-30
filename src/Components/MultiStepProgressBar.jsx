import React from 'react'
import { ProgressBar, Step } from "react-step-progress-bar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList, faIdBadge, faThumbsUp, faBriefcase, faSearch } from '@fortawesome/free-solid-svg-icons'

const MultiStepProgressBar = (props) => {
    var stepPercentage = 0;
    if (props.currentStep === 1) {
        stepPercentage = 9;
    } else if (props.currentStep === 2) {
        stepPercentage = 18;
    } else if (props.currentStep === 3) {
        stepPercentage = 27;
    } else if (props.currentStep === 4) {
        stepPercentage = 36;
    } else if (props.currentStep === 5) {
        stepPercentage = 45;
    } else if (props.currentStep === 6) {
        stepPercentage = 54;
    } else if (props.currentStep === 7) {
        stepPercentage = 63;
    } else if (props.currentStep === 8) {
        stepPercentage = 72;
    } else if (props.currentStep === 9) {
        stepPercentage = 81;
    } else if (props.currentStep === 10) {
        stepPercentage = 90;
    } else if (props.currentStep === 11) {
        stepPercentage = 100;
    } else {
        stepPercentage = 0;
    }

    return (
        <ProgressBar percent={stepPercentage}>
            <Step>
                {({ accomplished, index }) => (
                    <div
                        className={`indexedStep ${accomplished ? "accomplished" : null}`}
                    >
                        {index + 1}

                        {/* <FontAwesomeIcon icon={faBriefcase} className="fs-6 upload-file atras" color="#eee" /> */}
                    </div>
                )}
            </Step>
            <Step>
                {({ accomplished, index }) => (
                    <div
                        className={`indexedStep ${accomplished ? "accomplished" : null}`}
                    >
                        {index + 1}
                        {/* <FontAwesomeIcon icon={faClipboardList} className="fs-6 upload-file atras" color="#eee" /> */}
                    </div>
                )}
            </Step>
            <Step>
                {({ accomplished, index }) => (
                    <div
                        className={`indexedStep ${accomplished ? "accomplished" : null}`}
                    >
                        {index + 1}
                        {/* <FontAwesomeIcon icon={faSearch} className="fs-6 upload-file atras" color="#eee" /> */}
                    </div>
                )}
            </Step>
            <Step>
                {({ accomplished, index }) => (
                    <div
                        className={`indexedStep ${accomplished ? "accomplished" : null}`}
                    >
                        {index + 1}
                        {/* <FontAwesomeIcon icon={faThumbsUp} className="fs-6 upload-file atras" color="#eee" /> */}
                    </div>
                )}
            </Step>
            <Step>
                {({ accomplished, index }) => (
                    <div
                        className={`indexedStep ${accomplished ? "accomplished" : null}`}
                    >
                        {index + 1}
                    </div>
                )}
            </Step>
            <Step>
                {({ accomplished, index }) => (
                    <div
                        className={`indexedStep ${accomplished ? "accomplished" : null}`}
                    >
                        {index + 1}
                    </div>
                )}
            </Step>
            <Step>
                {({ accomplished, index }) => (
                    <div
                        className={`indexedStep ${accomplished ? "accomplished" : null}`}
                    >
                        {index + 1}
                    </div>
                )}
            </Step>
            <Step>
                {({ accomplished, index }) => (
                    <div
                        className={`indexedStep ${accomplished ? "accomplished" : null}`}
                    >
                        {index + 1}
                    </div>
                )}
            </Step>
            <Step>
                {({ accomplished, index }) => (
                    <div
                        className={`indexedStep ${accomplished ? "accomplished" : null}`}
                    >
                        {index + 1}
                    </div>
                )}
            </Step>
            <Step>
                {({ accomplished, index }) => (
                    <div
                        className={`indexedStep ${accomplished ? "accomplished" : null}`}
                    >
                        {index + 1}
                    </div>
                )}
            </Step>
            <Step>
                {({ accomplished, index }) => (
                    <div
                        className={`indexedStep ${accomplished ? "accomplished" : null}`}
                    >
                        {index + 1}
                    </div>
                )}
            </Step>

        </ProgressBar>
    )
}

export default MultiStepProgressBar