import * as React from 'react';
import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import CustomTooltip from './tooltip';
import { useAppSelector } from '../redux/hooks';
import IndeterminateCheckBoxRoundedIcon from '@mui/icons-material/IndeterminateCheckBoxRounded';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { styled, alpha } from '@mui/material/styles';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { useAppDispatch } from '../redux/hooks';
import ShapeLineIcon from '@mui/icons-material/ShapeLine';
import {  FeatureCollection, Feature, Geometry, GeoJsonObject } from 'geojson'; 
import { Interface } from 'readline';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';


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


interface RasterData {
  folder: string;
  name: string;
  way: string;
}



interface wayToMap {
  type: 'way';
  payload: string;
}

const buildTree = (dictionary: Record<string, any> | null, itemId: string, rasterData: RasterData[]): React.ReactNode => {
  

  if (dictionary === null) {
      return null; // Возвращаем null, если dictionary равен null
  }

      return Object.entries(dictionary).map(([key, value]) => {
      const currentItemId = `${itemId}-${key}`;


      const dispatch = useAppDispatch();

      interface wayToMap {
        type: 'way';
        payload: string;
      }
    
      const showMapByID = (way: string) => {
        dispatch<wayToMap>({ type: 'way', payload: way });
      };



      return (
        <CustomTreeItem key={currentItemId} itemId={currentItemId} label={key}>
          {/* Проверяем, что value - это объект, чтобы избежать ошибки */}
          {value && typeof value === 'object' && Object.keys(value).length > 0 && (
            buildTree(value, currentItemId, rasterData) 
          )}

          {rasterData.filter(r => r.folder === key).map(r => (
            
            <CustomTooltip key={r.name} tooltipText="Текст тултипа">

            {/* <Tooltip title="Add" placement="right"> */}

              <CustomTreeItem 
                slots={{ endIcon: ShapeLineIcon }} 
                key={r.name} 
                itemId={`${currentItemId}-${r.name}`} 
                label={r.name} 
                onClick={() => showMapByID(r.way)} 
              />

            {/* </Tooltip> */}
            </CustomTooltip>

          ))}

        </CustomTreeItem>
      );
    });
};


export default function BasicSimpleTreeView() {




// const dictionary = useAppSelector(state => state.catalog);


  // Состояние для данных GeoJSON
  const [myTree, setMyTree] = useState(null);

  useEffect(() => {
    // Проверка, что `way` не null
    if ('http://127.0.0.1:5000/static/tree.json') {
      fetch('http://127.0.0.1:5000/static/tree.json') 
        .then(response => response.json()) 
        .then(data => setMyTree(data));
    }

  }, []); 
  

  // let dictionary = {'static': {'rasters': {}, 'poly': {'ocean': {}}, 'points': {}}};


  const [rasterData, setRasterData] = useState<RasterData[]>([]);

  // const rasterData: RasterData[] = [
  //   { folder: 'static', way: 'http://127.0.0.1:5000/static/s1.json', name: 's1.json' },
  //   { folder: 'static', way: 'http://127.0.0.1:5000/static/Ocean.json', name: 'Ocean.json' },
  // ]; 


  useEffect(() => {
    // Проверка, что `way` не null
    if ('http://127.0.0.1:5000/static/rasterData.json') {
      fetch('http://127.0.0.1:5000/static/rasterData.json') 
        .then(response => response.json()) 
        .then(data => setRasterData(data));
    }   console.log(rasterData);

  }, []); 
  



  

  return (
    <div style={{margin:'15px'}}>
      <SimpleTreeView
        aria-label="customized"
        defaultExpandedItems={['0', '1']}
        slots={{
          expandIcon: FolderIcon,
          collapseIcon: FolderOpenIcon,
          endIcon: FolderOpenIcon,
          // endIcon: EndIcon,
           // endIcon: CheckBoxOutlineBlankIcon,
        }}
        sx={{ overflowX: 'hidden', minHeight: 270, flexGrow: 1, maxWidth: 400 }}
      >

        {myTree && buildTree(myTree, '1', rasterData)}

      </SimpleTreeView>
      </div>
  );
}

















