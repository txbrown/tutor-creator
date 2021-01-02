import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import Head from 'next/head';
import React, { useState } from 'react';
import ReactFlow, { FlowElement } from 'react-flow-renderer';
import StepBox from '../component/StepBox';

function StepEditDrawer({
  drawerOpen = false,
  onDrawerClose,
  item,
  onSave,
}: {
  drawerOpen: boolean;
  onDrawerClose?: () => void;
  item?: FlowElement;
  onSave?: (el: FlowElement) => void;
}) {
  const [editingItem, setItem] = useState<FlowElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure({
    isOpen: drawerOpen,
    onOpen: () => {
      setItem(item);
    },
  });
  const btnRef = React.useRef();
  console.log(editingItem);
  return (
    <>
      {/* <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
        Open
      </Button> */}
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={() => {
          onClose();
          onDrawerClose && onDrawerClose();
        }}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Edit step</DrawerHeader>

            <DrawerBody>
              <Input
                placeholder='Label'
                defaultValue={item?.data?.label ?? 'Label'}
                onChange={(event) => {
                  setItem({
                    ...item,
                    data: { label: event.target.value },
                  });
                }}
              />
            </DrawerBody>

            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                color='blue'
                onClick={() => {
                  if (onSave) {
                    onSave(editingItem);
                  }
                }}
              >
                Save
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

const initialFlowElementsMap = new Map<string, FlowElement>([
  [
    '1',
    {
      id: '1',
      type: 'input', // input node
      data: { label: 'Step 1' },
      position: { x: 250, y: 25 },
    },
  ],

  [
    '2',
    {
      id: '2',
      // you can also pass a React component as a label
      data: { label: 'Step 2' },
      position: { x: 100, y: 125 },
    },
  ],

  [
    '3',
    {
      id: '3',
      type: 'output', // output node
      data: { label: 'Show success' },
      position: { x: 250, y: 250 },
    },
  ],

  ['e2-3', { id: 'e2-3', source: '1', target: '2' }],
  ['e1-2', { id: 'e1-2', source: '2', target: '3', animated: true }],
]);

export default function Home() {
  const [blockMap, setBlockMap] = useState<Map<string, FlowElement>>(
    initialFlowElementsMap
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingEl, setEditingEl] = useState<FlowElement>(null);
  const updateMap = (k: string, v: FlowElement) => {
    setBlockMap(blockMap.set(k, v));
  };

  const toggleDrawer = React.useCallback((elementId: string) => {}, []);
  console.log(editingEl);
  return (
    <Box p={24}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Flex justifyContent='center' mb={12}>
        <Heading>Lesson designer</Heading>
      </Flex>

      <StepEditDrawer
        drawerOpen={isDrawerOpen}
        onDrawerClose={() => {
          setIsDrawerOpen(false);
        }}
        item={editingEl}
        onSave={(el) => {
          updateMap(el.id, el);
          setIsDrawerOpen(false);
        }}
      />
      <Flex width='100%' height='100vh'>
        <Box flex={1} pr={3} mr={3} borderRight='1px solid' height='100%'>
          <StepBox title='Step' description='A new step/view of the lesson' />
          <StepBox
            color='red.200'
            title='Condition'
            description='A logical condition, e.g. if A = 1'
          />
          <StepBox color='green.200' title='Event' description='When X do Y' />
        </Box>
        <Box flex={3} minWidth={'70%'} background='gray.50' id='canvas'>
          <ReactFlow
            elements={Array.from(blockMap.values())}
            elementsSelectable
            onElementClick={(_, el) => {
              setEditingEl(el);
              setIsDrawerOpen(true);
            }}
          />
        </Box>
      </Flex>
    </Box>
  );
}
