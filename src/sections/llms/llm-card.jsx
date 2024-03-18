import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';

import { actions } from 'src/store/slices/llms';

// ----------------------------------------------------------------------

export default function LLMCard({ llm }) {
  const { llms } = useSelector((state) => state.llms);
  const dispatch = useDispatch();

  const isSelected = llms.some((g) => g.id === llm.id);

  const handleLLMSelect = () => {
    if (isSelected) {
      dispatch(actions.removeLLM(llm));
    } else {
      dispatch(actions.addLLM(llm));
    }
  };

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
    <Card
      className="animate__animated animate__slideInUp"
      raised
      variant="elevation"
      sx={{
        cursor: 'pointer',
        border: isSelected ? '2px solid #649456' : 'none',
      }}
      onClick={handleLLMSelect}
    >
      <Box sx={{ pt: '100%', position: 'relative' }}>{renderImg}</Box>

      <Stack spacing={2} sx={{ p: 3, position: 'relative' }}>
        <Link color="inherit" underline="hover" variant="h5" align="center" noWrap>
          {llm.name}
        </Link>
        {isSelected && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 4,
              right: '50%',
              transform: 'translateX(50%)',
              bgcolor: 'common.white',
              zIndex: 99,
            }}
          >
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
              Selected
            </Typography>
          </Box>
        )}
      </Stack>
    </Card>
  );
}

LLMCard.propTypes = {
  llm: PropTypes.object,
};
