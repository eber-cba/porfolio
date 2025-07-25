import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

export default function LineaDeTime() {
  return (
    <React.Fragment>
      <Timeline position="right">
        <TimelineItem>
          <TimelineOppositeContent
            className="labelTimline"
            color="text.secondary"
          >
            09/2021 – 12/2021
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className="labelTimline">
            <b>Coding Bootcamp</b>
            <p /> Plataforma 5
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            className="labelTimline"
            color="text.secondary"
          >
            2016 – 2019
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className="labelTimline">
            <b>Bachelor of theater</b> <p /> National University of Cordoba
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            className="labelTimline"
            color="text.secondary"
          >
            2013 – 2016
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className="labelTimline">
            <b>Software development</b> <p />
            Cordoba Higher Technical Institute
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </React.Fragment>
  );
}
