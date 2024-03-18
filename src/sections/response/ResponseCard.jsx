import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Modal, Paper, Avatar, Typography } from '@mui/material';

import { actions } from 'src/store/slices/llms';

import Speaker from 'src/components/Speaker';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ResponseCard({ llm, isOpen = false }) {
  const [open, setOpen] = useState(isOpen);
  const { firstModalOpen } = useSelector((state) => state.llms);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (isOpen) {
      handleOpen();
    }
    if (firstModalOpen && !isOpen) {
      dispatch(actions.closeFirstModal());
    }
  }, [isOpen, firstModalOpen, dispatch]);

  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [llm.conversation]);

  const renderImg = (
    <Box
      component="img"
      alt={llm.name}
      src={llm.imagePath}
      sx={{
        top: 20,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  return (
    <>
      <Card
        className="animate__animated animate__bounceIn"
        sx={{ cursor: 'pointer' }}
        raised
        variant="elevation"
        onClick={handleOpen}
      >
        <Box sx={{ pt: '100%', position: 'relative' }}>{renderImg}</Box>

        <Stack spacing={2} sx={{ p: 3 }} direction="column">
          <Link color="inherit" underline="hover" variant="h5" align="center" noWrap>
            {llm.name}
          </Link>

          <Typography variant="body2" align="center" noWrap>
            {llm.conversation
              ? llm.conversation[llm.conversation.length - 1]?.content
              : 'Where am I?'}
          </Typography>
        </Stack>
      </Card>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: '80vw',
            maxHeight: 500,
            overflowY: 'auto',
            borderRadius: 2,
          }}
        >
          <Stack direction="row" spacing={2} alignContent="center" justifyContent="center">
            <Box
              component="img"
              alt={llm.name}
              src={llm.imagePath}
              sx={{
                objectFit: 'cover',
                height: 100,
                width: 100,
              }}
            />
          </Stack>
          <Typography variant="h5" component="h2" align="center">
            What does {llm.name} had to say so far?
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}>
            {llm.conversation?.map((entry, index) => (
              <Box
                ref={endOfMessagesRef}
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: entry.role === 'assistant' ? 'row' : 'row-reverse',
                  alignItems: 'center',
                  mb: 3,
                  position: 'relative',
                }}
              >
                <Avatar
                  src={entry.role === 'assistant' ? llm.imagePath : 'assets/images/avatar_1.jpg'}
                  sx={{ mr: 1, ml: 1 }}
                />
                <Paper
                  sx={{
                    p: 1,
                    position: 'relative',
                    bgcolor: entry.role === 'assistant' ? 'info.lighter' : 'primary.lighter',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      width: 0,
                      height: 0,
                      borderTop: '10px solid transparent',
                      borderBottom: '10px solid transparent',
                      [entry.role === 'assistant' ? 'left' : 'right']: -10,
                      [entry.role === 'assistant' ? 'borderRight' : 'borderLeft']: `10px solid ${
                        entry.role === 'assistant' ? '#CAFDF5' : '#D0ECFE'
                      }`,
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  />
                  <Typography variant="body2">{entry.content}</Typography>
                  <Speaker
                    sx={{
                      position: 'absolute',
                      top: '0',
                      transform: 'translateY(-50%)',
                      right: '-1rem',
                      left: entry.role === 'assistant' ? 'auto' : '100%',
                    }}
                    phrase={entry.content}
                    name={llm.name}
                    role={entry.role}
                  />
                </Paper>
              </Box>
            ))}
          </Box>
          <Iconify
            icon="eva:close-outline"
            onClick={handleClose}
            width={32}
            sx={{
              position: 'fixed',
              top: 10,
              right: 10,
              cursor: 'pointer',
              zIndex: 999,
              backgroundColor: 'white',
              borderRadius: '50%',
            }}
          />
        </Box>
      </Modal>
    </>
  );
}

ResponseCard.propTypes = {
  llm: PropTypes.object,
  isOpen: PropTypes.bool,
};
