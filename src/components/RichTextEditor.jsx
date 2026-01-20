import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import config from '../config/config'
import { Controller } from 'react-hook-form'

function RTE({ name, control, defaultValue = "", label }) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={config.tinymceApiKey}
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 560,
              menubar: false,
              statusbar: false,
              promotion: false,
              toolbar_mode: "sliding",
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "table",
                "code",
                "fullscreen",
                "wordcount",
                "searchreplace",
              ],
              toolbar:
                "undo redo | blocks | bold italic underline | bullist numlist | alignleft aligncenter alignright | link image | blockquote code | removeformat",
              content_style:
                "body { font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size:15px; line-height:1.7; color:#111318; background: transparent; padding: 1rem; } blockquote { border-left: 3px solid #3f52f0; margin: 0; padding-left: 0.75rem; color: #1e2430; } a { color: #3f52f0; text-decoration: underline; }",
            }}
            onEditorChange={onChange}
          />
        )}
      />

    </div>
  )
}

export default RTE 