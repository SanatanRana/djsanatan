import React, { useState, useEffect } from 'react'
import mediaService from '../../services/media.service'
import { toast } from 'sonner'

export default function ManageMedia() {
  const [mediaList, setMediaList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [description, setDescription] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)

  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      const data = await mediaService.getMediaByAdmin(user.id)
      setMediaList(Array.isArray(data) ? data : [])
    } catch (error) {
      toast.error('Failed to fetch media')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileSelect = (file) => {
    if (!file) return
    const maxSize = 250 * 1024 * 1024 // 250MB
    if (file.size > maxSize) {
      toast.error('File size exceeds 250MB limit')
      return
    }
    setSelectedFile(file)
    // Generate preview
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files[0]
    handleFileSelect(file)
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!selectedFile) {
      toast.error('Please select a file to upload')
      return
    }

    setIsUploading(true)
    setUploadProgress(10)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => (prev >= 90 ? 90 : prev + 10))
    }, 500)

    try {
      await mediaService.uploadMedia(selectedFile, description)
      clearInterval(progressInterval)
      setUploadProgress(100)
      toast.success('Media uploaded successfully!')

      // Reset form
      setTimeout(() => {
        setSelectedFile(null)
        setDescription('')
        setPreviewUrl(null)
        setUploadProgress(0)
        setShowUploadForm(false)
        fetchMedia()
      }, 500)
    } catch (error) {
      clearInterval(progressInterval)
      setUploadProgress(0)
      toast.error(error.response?.data || 'Failed to upload media')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (mediaId) => {
    if (!window.confirm('Are you sure you want to delete this media?')) return
    try {
      await mediaService.deleteMedia(mediaId)
      toast.success('Media deleted successfully')
      fetchMedia()
    } catch (error) {
      toast.error('Failed to delete media')
    }
  }

  const handleCancel = () => {
    setShowUploadForm(false)
    setSelectedFile(null)
    setDescription('')
    setPreviewUrl(null)
    setUploadProgress(0)
  }

  const isVideo = (url) => {
    if (!url) return false
    const videoExts = ['.mp4', '.mov', '.avi', '.webm', '.mkv']
    return videoExts.some((ext) => url.toLowerCase().includes(ext))
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-syne text-2xl md:text-3xl font-extrabold text-on-surface">
            Manage Media
          </h2>
          <p className="text-on-surface-variant text-sm mt-1">
            Upload and manage your event photos & videos.
          </p>
        </div>
        <button
          onClick={showUploadForm ? handleCancel : () => setShowUploadForm(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:bg-primary/90 transition shrink-0"
        >
          <span className="material-symbols-outlined">
            {showUploadForm ? 'close' : 'cloud_upload'}
          </span>
          {showUploadForm ? 'Cancel' : 'Upload Media'}
        </button>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="glass-card p-6 rounded-xl border border-primary/30 animate-slide-up">
          <h3 className="font-syne text-xl font-bold text-on-surface mb-4">
            Upload New Media
          </h3>
          <form onSubmit={handleUpload} className="flex flex-col gap-4">
            {/* Drag & Drop Area */}
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setDragActive(true)
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById('media-file-input').click()}
              className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-primary bg-primary/10'
                  : 'border-white/20 hover:border-primary/50 hover:bg-white/5'
              }`}
            >
              <input
                id="media-file-input"
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files[0])}
              />
              {previewUrl ? (
                <div className="flex flex-col items-center gap-3">
                  {selectedFile?.type.startsWith('video') ? (
                    <video
                      src={previewUrl}
                      className="max-h-48 rounded-lg object-contain"
                      muted
                    />
                  ) : (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-h-48 rounded-lg object-contain"
                    />
                  )}
                  <p className="text-sm text-on-surface font-semibold">
                    {selectedFile?.name}
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    {(selectedFile?.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <span className="material-symbols-outlined text-5xl text-primary/50">
                    cloud_upload
                  </span>
                  <p className="text-on-surface font-semibold text-sm">
                    Drag & drop your file here, or tap to browse
                  </p>
                  <p className="text-on-surface-variant text-xs">
                    Supports images & videos up to 250MB
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1 mb-1 block">
                Description (Optional)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="E.g. Wedding event at Grand Hotel"
                className="w-full bg-surface text-on-surface border border-white/10 rounded-lg p-3 outline-none focus:border-primary transition-all text-sm"
              />
            </div>

            {/* Progress Bar */}
            {isUploading && (
              <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isUploading || !selectedFile}
              className="bg-success text-white py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-success/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isUploading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-lg">
                    progress_activity
                  </span>
                  Uploading... {uploadProgress}%
                </>
              ) : (
                'Upload File'
              )}
            </button>
          </form>
        </div>
      )}

      {/* Media Grid */}
      {isLoading ? (
        <div className="flex justify-center p-12">
          <span className="material-symbols-outlined animate-spin text-primary text-3xl">
            progress_activity
          </span>
        </div>
      ) : mediaList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mediaList.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-xl overflow-hidden group relative"
            >
              {/* Media Preview */}
              <div className="aspect-video bg-surface-container-low relative">
                {item.mediaType === 'VIDEO' || isVideo(item.mediaUrl) ? (
                  <video
                    src={item.mediaUrl}
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={item.mediaUrl}
                    alt={item.description || 'DJ Media'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
              </div>

              {/* Info & Actions */}
              <div className="p-4 flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">
                    {item.mediaType === 'VIDEO' ? '🎬 Video' : '📷 Image'}
                  </p>
                  {item.description && (
                    <p className="text-sm text-on-surface-variant mt-1 truncate">
                      {item.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-error hover:bg-error/10 p-2 rounded-lg transition shrink-0"
                  title="Delete"
                >
                  <span className="material-symbols-outlined text-lg">
                    delete
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 glass-card rounded-xl">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4 block">
            perm_media
          </span>
          <p className="text-on-surface-variant text-sm">
            No media uploaded yet. Click "Upload Media" to add your first photo
            or video.
          </p>
        </div>
      )}
    </div>
  )
}
