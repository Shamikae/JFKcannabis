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
  Eye,
  FileText,
  Loader
} from 'lucide-react';
import { db, storage } from '../../firebase/config';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface FirebaseContentEditorProps {
  contentId: string;
  contentType: 'page' | 'section' | 'product' | 'blog';
  initialContent?: string;
  onSave?: (content: string) => void;
  placeholder?: string;
  height?: string;
}

const FirebaseContentEditor: React.FC<FirebaseContentEditorProps> = ({ 
  contentId, 
  contentType,
  initialContent = '', 
  onSave,
  placeholder = 'Start typing...',
  height = 'min-h-[300px]'
}) => {
  const [content, setContent] = useState(initialContent);
  const [previewMode, setPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const contentRef = doc(db, contentType, contentId);
        const contentSnap = await getDoc(contentRef);
        
        if (contentSnap.exists()) {
          setContent(contentSnap.data().content || '');
        } else {
          // Create a new document if it doesn't exist
          await setDoc(contentRef, { 
            content: initialContent,
            createdAt: new Date(),
            updatedAt: new Date()
          });
          setContent(initialContent);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
        setError('Failed to load content. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [contentId, contentType, initialContent]);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    
    try {
      const contentRef = doc(db, contentType, contentId);
      await updateDoc(contentRef, {
        content,
        updatedAt: new Date()
      });
      
      if (onSave) {
        onSave(content);
      }
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving content:', error);
      setError('Failed to save content. Please try again.');
    } finally {
      setIsSaving(false);
    }
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

  const insertImage = async (file?: File) => {
    if (file) {
      setIsUploading(true);
      try {
        // Upload to Firebase Storage
        const storageRef = ref(storage, `content/${contentType}/${contentId}/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        
        // Insert image markdown
        insertFormatting(`![Image](${url})`, '');
      } catch (error) {
        console.error('Error uploading image:', error);
        setError('Failed to upload image. Please try again.');
      } finally {
        setIsUploading(false);
      }
    } else {
      const url = prompt('Enter image URL:');
      if (url) {
        insertFormatting(`![Image](${url})`, '');
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      insertImage(file);
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    const text = prompt('Enter link text:');
    if (url && text) {
      insertFormatting(`[${text}](${url})`, '');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6 border border-gray-300 rounded-lg bg-gray-50">
        <Loader className="h-6 w-6 text-primary-600 animate-spin mr-2" />
        <span>Loading content...</span>
      </div>
    );
  }

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
          onClick={() => document.getElementById('image-upload')?.click()}
          className="p-2 hover:bg-gray-200 rounded relative"
          title="Insert Image"
          disabled={isUploading}
        >
          {isUploading ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <Image className="h-4 w-4" />
          )}
          <input 
            id="image-upload" 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileUpload}
            disabled={isUploading}
          />
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
          {error && (
            <span className="text-red-600 flex items-center text-sm">
              <X className="h-4 w-4 mr-1" />
              {error}
            </span>
          )}
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
                <Loader className="animate-spin h-4 w-4 mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-1.5" />
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
          className={`w-full ${height} p-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none`}
        />
      )}
    </div>
  );
};

export default FirebaseContentEditor;