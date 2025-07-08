import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Image, 
  Link as LinkIcon, 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Heading3, 
  Undo, 
  Redo,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Upload,
  X,
  Check,
  Eye
} from 'lucide-react';

interface ContentEditorProps {
  initialContent: string;
  onSave: (content: string) => void;
  placeholder?: string;
  height?: string;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ 
  initialContent, 
  onSave,
  placeholder = 'Start typing...',
  height = 'min-h-[300px]'
}) => {
  const [content, setContent] = useState(initialContent);
  const [previewMode, setPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      onSave(content);
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 800);
  };

  const insertFormatting = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const beforeText = content.substring(0, start);
    const afterText = content.substring(end);

    const newContent = beforeText + prefix + selectedText + suffix + afterText;
    setContent(newContent);
    
    // Set cursor position after the operation
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length, 
        end + prefix.length
      );
    }, 0);
  };

  const insertHeading = (level: number) => {
    const prefix = '#'.repeat(level) + ' ';
    insertFormatting(prefix);
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      insertFormatting(`![Image](${url})`, '');
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    const text = prompt('Enter link text:');
    if (url && text) {
      insertFormatting(`[${text}](${url})`, '');
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-300 bg-gray-50">
        <button 
          onClick={() => insertFormatting('**', '**')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button 
          onClick={() => insertFormatting('*', '*')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </button>
        <div className="h-6 border-r border-gray-300 mx-1"></div>
        <button 
          onClick={() => insertHeading(1)}
          className="p-2 hover:bg-gray-200 rounded"
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </button>
        <button 
          onClick={() => insertHeading(2)}
          className="p-2 hover:bg-gray-200 rounded"
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </button>
        <button 
          onClick={() => insertHeading(3)}
          className="p-2 hover:bg-gray-200 rounded"
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </button>
        <div className="h-6 border-r border-gray-300 mx-1"></div>
        <button 
          onClick={() => insertFormatting('- ', '')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </button>
        <button 
          onClick={() => insertFormatting('1. ', '')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </button>
        <div className="h-6 border-r border-gray-300 mx-1"></div>
        <button 
          onClick={insertLink}
          className="p-2 hover:bg-gray-200 rounded"
          title="Insert Link"
        >
          <LinkIcon className="h-4 w-4" />
        </button>
        <button 
          onClick={insertImage}
          className="p-2 hover:bg-gray-200 rounded"
          title="Insert Image"
        >
          <Image className="h-4 w-4" />
        </button>
        <button 
          onClick={() => insertFormatting('`', '`')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Code"
        >
          <Code className="h-4 w-4" />
        </button>
        <div className="h-6 border-r border-gray-300 mx-1"></div>
        <button 
          onClick={() => setPreviewMode(!previewMode)}
          className={`p-2 rounded ${previewMode ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-200'}`}
          title="Preview"
        >
          <Eye className="h-4 w-4" />
        </button>
        
        <div className="ml-auto flex items-center gap-2">
          {saveSuccess && (
            <span className="text-green-600 flex items-center text-sm">
              <Check className="h-4 w-4 mr-1" />
              Saved
            </span>
          )}
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-3 py-1.5 bg-primary-600 text-white rounded hover:bg-primary-700 flex items-center text-sm"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-1" />
                Save
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor/Preview Area */}
      {previewMode ? (
        <div 
          className={`p-4 ${height} overflow-y-auto prose max-w-none`}
          dangerouslySetInnerHTML={{ 
            __html: content
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
              .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
              .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
              .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
              .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width: 100%;" />')
              .replace(/^- (.*?)$/gm, '<ul><li>$1</li></ul>').replace(/<\/ul><ul>/g, '')
              .replace(/^[0-9]+\. (.*?)$/gm, '<ol><li>$1</li></ol>').replace(/<\/ol><ol>/g, '')
              .replace(/`(.*?)`/g, '<code>$1</code>')
              .replace(/\n/g, '<br />')
          }}
        />
      ) : (
        <textarea
          id="content-editor"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${height} p-4 focus:outline-none resize-none`}
        />
      )}
    </div>
  );
};

export default ContentEditor;