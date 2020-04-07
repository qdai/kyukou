import { Link as AnchorLink, Button, Checkbox, Container, FormControlLabel, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import { abouts, departments } from '../../constant';
import AppBar from '../AppBar';
import createCalendarURL from './create-calendar-url';
import useSettings from '../../hooks/use-settings';

const Settings = () => {
  const {
    selectedAbouts,
    selectedDepartments,
    toggleAbout,
    toggleDepartment
  } = useSettings();

  const calendarURL = createCalendarURL(selectedDepartments);

  return (
    <Fragment>
      <AppBar>
        {'Settings'}
      </AppBar>
      <Container>
        <Typography variant="h4">
          {'表示する情報'}
        </Typography>
        <dl>
          <dt>
            {'学部'}
          </dt>
          <dd>
            {departments.map(department => (
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={selectedDepartments.includes(department)}
                    color="primary"
                    name={department}
                    onClick={event => toggleDepartment(event.target.name)}
                  />
                )}
                key={department}
                label={department}
              />
            ))}
          </dd>
          <dt>
            {'種別'}
          </dt>
          <dd>
            {abouts.map(about => (
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={selectedAbouts.includes(about)}
                    color="primary"
                    name={about}
                    onClick={event => toggleAbout(event.target.name)}
                  />
                )}
                key={about}
                label={about}
              />
            ))}
          </dd>
        </dl>
        <Typography variant="h4">
          {'カレンダー'}
        </Typography>
        <Typography paragraph>
          {'休講情報をiCalendar形式で配信しています。'}
        </Typography>
        <Typography paragraph>
          <Button
            color="primary"
            href={calendarURL}
            variant="contained"
          >
            {'Get iCalendar'}
          </Button>
        </Typography>
        <Typography paragraph>
          {'URL: '}
          <AnchorLink href={calendarURL}>
            {calendarURL}
          </AnchorLink>
        </Typography>
      </Container>
    </Fragment>
  );
};

export default Settings;
