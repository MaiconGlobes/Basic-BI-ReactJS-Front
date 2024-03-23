import { styled } from '@mui/material/styles';
import ComponentSkeleton from './ComponentSkeleton';
import MainCard from 'components/MainCard';

const IFrameWrapper = styled('iframe')(() => ({
   height: 'calc(100vh - 210px)',
   border: 'none'
}));

const AntIcons = () => (
   <ComponentSkeleton>
      <MainCard title="Ant Design">
         <IFrameWrapper title="Ant Design" width="100%" src="#" />
      </MainCard>
   </ComponentSkeleton>
);

export default AntIcons;
