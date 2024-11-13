import { Event, EventType, Milliseconds } from "../../../../../types"
import Part from "../../../../playbacker/band/part/part"
import { Beats, Bpm, computeBeatTiming, convertBpmToMpb, convertSpecificPitchToMidiNumber, Dynamics, SwingAmount, triggerLength } from "./helper"

export default function* jazzDrummer(drum: Part, tempo: Bpm, swingAmount: SwingAmount, swingDivision: Beats, length: Beats, velocity: Dynamics): Generator<Event> {
    const mpb: Milliseconds = convertBpmToMpb(tempo)

    // const closedHiHat = convertSpecificPitchToMidiNumber('D3')
    const openHiHat = convertSpecificPitchToMidiNumber('D#3')

    for (let i = 0; i < length; i += 1) {
        const startTime = computeBeatTiming(i, mpb, swingAmount, swingDivision)

        yield {
            type: EventType.NoteOn,
            time: startTime,
            part: drum,
            pitch: openHiHat,
            velocity,
        }

        yield {
            type: EventType.NoteOff,
            time: startTime + triggerLength,
            part: drum,
            pitch: openHiHat,
        }
    }
}