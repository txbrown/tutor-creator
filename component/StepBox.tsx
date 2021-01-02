import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  ButtonGroup,
  Editable,
  Flex,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';
import * as React from 'react';

interface IStepBoxProps {
  title?: string;
  description?: string;
  canEdit?: boolean;
  color?: string;
}

function StepEditableBox({
  title = 'New step',
  description = '➡️',
  canEdit = false,
}) {
  /* Here's a custom control */
  function EditableControls({ isEditing, onSubmit, onCancel, onEdit }) {
    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton aria-label='' icon={<CheckIcon />} onClick={onSubmit} />
        <IconButton aria-label='' icon={<CloseIcon />} onClick={onCancel} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center'>
        <IconButton
          aria-label=''
          size='sm'
          icon={<EditIcon />}
          onClick={onEdit}
        />
      </Flex>
    );
  }

  const Preview = () => {
    return (
      <>
        <Text fontSize='xl' mb={3}>
          {title}
        </Text>
        <Text fontSize='sm'>{description}</Text>
      </>
    );
  };

  const EditingFields = () => {
    return (
      <Box>
        <Input placeholder='title' defaultValue={title} />
        <Input placeholder='title' defaultValue={description} />
      </Box>
    );
  };

  return (
    <Editable
      textAlign='center'
      defaultValue='Rasengan ⚡️'
      fontSize='2xl'
      isPreviewFocusable={false}
      submitOnBlur={false}
    >
      {({ isEditing, ...props }) => (
        <>
          <Box
            className='create-flowy'
            py={4}
            px={3}
            borderColor='blue'
            borderRadius={24}
            borderWidth={1}
          >
            {!isEditing && <Preview />}
            {isEditing && <EditingFields />}
            {canEdit && <EditableControls {...props} isEditing={isEditing} />}
          </Box>
        </>
      )}
    </Editable>
  );
}

const StepBox: React.FunctionComponent<IStepBoxProps> = ({
  children,
  title = 'Title',
  description = 'Description',
  canEdit = false,
  color,
}) => {
  return (
    <Box
      p={3}
      borderColor={color || 'blue.200'}
      borderWidth='1px'
      borderRadius={4}
      mb={4}
    >
      <Text fontSize='xl' mb={3}>
        {title}
      </Text>
      <Text fontSize='sm' color='gray.500'>
        {description}
      </Text>
    </Box>
  );
};

export default StepBox;
