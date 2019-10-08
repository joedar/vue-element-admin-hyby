<template>
  <ckeditor v-model="editorData" :editor="editor" :config="editorConfig" />
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { MyCustomUploadAdapterPlugin } from './assets/uploader'
export default {
  name: 'CKeditor',
  data() {
    return {
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        extraPlugins: [MyCustomUploadAdapterPlugin],
        alignment: {
          options: ['left', 'center', 'right']
        },
        uploadUrl: '/api/upload/image'
      }
    }
  }
}
</script>
