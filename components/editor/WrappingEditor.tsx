import { Editor, EditorProps } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

export interface EditorWithForwardedProps extends EditorProps {
  forwardedRef?: React.MutableRefObject<Editor>;
}

const WrappingEditor = (props: EditorWithForwardedProps) => {
  return (
    <>
      {props.toolbarItems ? (
        <Editor ref={props.forwardedRef} {...props} />
      ) : (
        <Editor
          ref={props.forwardedRef}
          initialValue={props.initialValue}
          initialEditType="wysiwyg"
          height="100%"
          useCommandShortcut={false}
          autofocus={false}
          toolbarItems={[
            // 툴바 옵션 설정
            ['heading', 'bold', 'italic', 'strike'],
            ['hr', 'quote'],
            ['task', 'indent', 'outdent'],
            ['table', 'link'],
            ['code', 'codeblock'],
          ]}
        />
      )}
    </>
  );
};

WrappingEditor.propTypes = {};

export default WrappingEditor;
