import React, { MouseEvent, useCallback, useEffect, useState } from 'react';
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { LockOpenOutlined, LockOutlined } from '@mui/icons-material';

import { locksAPI } from '../../../api';
import LoadingBackdrop from '../../LoadingBackdrop';
import CustomSnackbarMsg from '../../CustomSnackbarMsg';
import { SnackbarType } from '../../../utils/constants';
import PageTitle from '../../PageTitle';

export default function AdministrationView() {
  const [loading, setLoading] = useState<boolean>(true);
  const [locked, setLocked] = useState<boolean>();
  const [notification, setNotification] = useState<{
    msg: string;
    type: SnackbarType;
  } | null>(null);

  const closeAlert = useCallback(() => {
    setNotification(null);
  }, []);

  const getLockStatus = useCallback(async () => {
    try {
      const result = await locksAPI.getLock();
      setLocked(result);
    } catch (e) {
      setNotification({
        msg: 'There was a problem loading the DB lock status',
        type: SnackbarType.ERROR,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getLockStatus();
  }, []);

  const handleLocking = useCallback(
    async (event: MouseEvent<HTMLElement>, newLockStatus: boolean) => {
      setLoading(true);
      try {
        await locksAPI.setLock({
          write: newLockStatus,
          errorMessage: 'DB is currently locked',
        });
        // result of `locksAPI.setLock` gives an outdated lock status
        setLocked(newLockStatus);
        setNotification({
          msg: 'DB lock updated successfuly',
          type: SnackbarType.SUCCESS,
        });
      } catch (e) {
        setNotification({
          msg: 'There was a problem updating the DB lock',
          type: SnackbarType.ERROR,
        });
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    <>
      <PageTitle title="Administration" />
      <Typography>
        Restrict the possible operations on a qdrant process. It is important to
        mention that:
      </Typography>
      <ul>
        <li>
          The configuration is not persistent therefore it is necessary to lock
          again following a restart.
        </li>
        <li>
          Locking applies to a single node only. It is necessary to call lock on
          all the desired nodes in a distributed deployment setup.
        </li>
      </ul>
      <Typography>
        If the lock is set to true, qdrant doesn’t allow creating new
        collections or adding new data to the existing storage. However deletion
        operations or updates are not forbidden under the write lock. This
        feature enables administrators to prevent a qdrant process from using
        more disk space while permitting users to search and delete unnecessary
        data.
      </Typography>

      <ToggleButtonGroup
        value={locked}
        exclusive
        onChange={handleLocking}
        aria-label="text alignment"
        disabled={locked === undefined}
        sx={{ marginTop: '40px' }}
      >
        <ToggleButton value={true} aria-label="left aligned">
          <LockOutlined />
        </ToggleButton>
        <ToggleButton value={false} aria-label="centered">
          <LockOpenOutlined />
        </ToggleButton>
      </ToggleButtonGroup>
      <LoadingBackdrop loading={loading} />
      <CustomSnackbarMsg
        message={notification?.msg}
        type={notification?.type}
        onClose={closeAlert}
      />
      {!loading && locked == null && (
        <Typography color="error" sx={{ marginTop: '15px' }}>
          There was a problem fetching the DB lock. Try refreshing the page.
        </Typography>
      )}
    </>
  );
}
