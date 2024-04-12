import { Viewer } from '@toast-ui/react-editor';

interface Props {
  content: string;
}

const PostViewer = ({ content }: Props) => {
  return <Viewer initialValue={content} />;
};

export default PostViewer;
