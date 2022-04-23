import { Button, Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import React, { Fragment, useCallback, useMemo } from 'react';
import { abouts, departments } from '../../constant';
import createCalendarURL from './create-calendar-url';
import { useCopyToClipboard } from 'usehooks-ts';
import useSettings from '../../hooks/use-settings';

const Settings = () => {
  const [copiedValue, copyToClipboard] = useCopyToClipboard();
  const {
    selectedAbouts,
    selectedDepartments,
    toggleAbout,
    toggleDepartment
  } = useSettings();

  const handleToggleDepartment = useCallback(event => {
    toggleDepartment(event.target.name);
  }, [toggleDepartment]);

  const handleToggleAbout = useCallback(event => {
    toggleAbout(event.target.name);
  }, [toggleAbout]);

  const calendarURL = useMemo(() => createCalendarURL(selectedDepartments), [selectedDepartments]);
  const handleCopyToClipboard = useCallback(() => {
    copyToClipboard(calendarURL);
  }, [calendarURL, copyToClipboard]);

  return (
    <Fragment>
      <Typography
        component="h3"
        gutterBottom
        variant="h5"
      >
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
                  onClick={handleToggleDepartment}
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
                  onClick={handleToggleAbout}
                />
              )}
              key={about}
              label={about}
            />
          ))}
        </dd>
      </dl>
      <Typography
        component="h3"
        gutterBottom
        variant="h5"
      >
        {'カレンダー'}
      </Typography>
      <Typography paragraph>
        {'休講情報をiCalendar形式で配信しています。'}
      </Typography>
      <Typography paragraph>
        <Button
          color="primary"
          onClick={handleCopyToClipboard}
          variant="contained"
        >
          {'カレンダーのURLをコピー'}
        </Button>
      </Typography>
      <Typography
        color={'primary'}
        paragraph
      >
        {copiedValue === calendarURL && 'URLをコピーしました。'}
      </Typography>
    </Fragment>
  );
};

export default Settings;
