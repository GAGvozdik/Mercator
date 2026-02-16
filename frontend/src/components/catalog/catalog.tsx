import * as React from 'react';
import Box from '@mui/material/Box';

import IndeterminateCheckBoxRoundedIcon from '@mui/icons-material/IndeterminateCheckBoxRounded';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { styled, alpha } from '@mui/material/styles';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.content}`]: {
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

function ExpandIcon(props: React.PropsWithoutRef<typeof AddBoxRoundedIcon>) {
  return <AddBoxRoundedIcon {...props} sx={{ opacity: 0.8 }} />;
}

function CollapseIcon(
  props: React.PropsWithoutRef<typeof IndeterminateCheckBoxRoundedIcon>,
) {
  return <IndeterminateCheckBoxRoundedIcon {...props} sx={{ opacity: 0.8 }} />;
}

function EndIcon(props: React.PropsWithoutRef<typeof DisabledByDefaultRoundedIcon>) {
  return <DisabledByDefaultRoundedIcon {...props} sx={{ opacity: 0.3 }} />;
}

export default function BasicSimpleTreeView() {
  return (
    <div style={{margin:'15px'}}>
      <SimpleTreeView
        aria-label="customized"
        defaultExpandedItems={['1', '3']}
        slots={{
          expandIcon: FolderIcon,
          collapseIcon: FolderOpenIcon,
          endIcon: EndIcon,
           // endIcon: CheckBoxOutlineBlankIcon,
        }}
        sx={{ overflowX: 'hidden', minHeight: 270, flexGrow: 1, maxWidth: 400 }}
      >


        <CustomTreeItem itemId="1" label="Main">

          <CustomTreeItem itemId="3" label="Subtree with children">
            <CustomTreeItem itemId="8" label="Hello" />       
            <CustomTreeItem itemId="7" label="Sub-subtree with children">
              <CustomTreeItem itemId="9" label="Child 1" />
              <CustomTreeItem itemId="10" label="Child 2" />
              <CustomTreeItem itemId="11" label="Child 3" />
            </CustomTreeItem>
          </CustomTreeItem>
        </CustomTreeItem>
      </SimpleTreeView>

      </div>
  );
}