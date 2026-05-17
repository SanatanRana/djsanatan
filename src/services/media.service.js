import api from './api'

const mediaService = {
  // Admin - Upload media file (image or video)
  uploadMedia: async (file, description) => {
    const formData = new FormData()
    formData.append('file', file)
    if (description) {
      formData.append('description', description)
    }
    const response = await api.post('/media/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },

  // Public - Get all media for a specific admin/DJ
  getMediaByAdmin: async (adminId) => {
    const response = await api.get(`/media/admin/${adminId}`)
    return response.data
  },

  // Admin - Delete a media item
  deleteMedia: async (mediaId) => {
    const response = await api.delete(`/media/${mediaId}`)
    return response.data
  },
}

export default mediaService
