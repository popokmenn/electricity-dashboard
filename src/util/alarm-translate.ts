// src/util/alarm-translate.ts

export const translateBinarySequence = (binarySequence: string): string[] => {
    const descriptions = [
        "Alarm status Flash memory error",
        "Alarm status RAM error",
        "Alarm status Clock loss (returns to initial chipset time)",
        "Alarm status Low battery (threshold 2.7V)",
        "Alarm status Microprocessor not functioning normally",
        "Alarm status Sampling data failure on ADC",
        "Alarm status Supercapacitor damaged/disconnected",
        "Alarm status Relay/shunt trip failed to open/close",
        "Event status Power supply failure",
        "Event status Power supply up",
        "Event status Time-of-use (ToU) setting change",
        "Event status Setting change (other than ToU)",
        "Event status Stop-measurement",
        "Event status Trigger test",
        "Event status I/O status change",
        "Event status Internal relay/contact status change",
        "Event status Meter reset",
        "Event status Date and time change",
        "Event status Asymmetric power",
        "Event status Meter ready remote reconnect",
        "Tamper status Meter cover opened",
        "Tamper status Terminal cover opened",
        "Tamper status Incorrect phase sequence",
        "Tamper status Current and voltage not in phase",
        "Tamper status Neutral current loss due to neutral wire cut",
        "Tamper status Voltage loss in 1 or 2 phases",
        "Tamper status Magnetic field influence ≤ 500 mT from outside",
        "Tamper status Reverse power",
        "Tamper status Measurement in quadrant 4 with threshold PF < 0.85",
        "Power limiter threshold exceeded",
        "Power limiter threshold back to normal",
        "Reserved for future use"
    ];

    const activeStatuses: string[] = [];

    for (let i = 0; i < binarySequence.length; i++) {
        if (binarySequence[binarySequence.length - 1 - i] === '1') {
            activeStatuses.push(descriptions[i]);
        }
    }

    return activeStatuses;
}
