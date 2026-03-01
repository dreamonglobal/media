import { useState, useCallback } from 'react'
import { Upload, X, Loader2, Film } from 'lucide-react'

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [metadata, setMetadata] = useState({
    trip: '',
    year: new Date().getFullYear().toString(),
    location: '',
  })

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      f => f.type.startsWith('video/') || f.type.startsWith('image/')
    )
    setFiles(prev => [...prev, ...droppedFiles])
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    setFiles(prev => [...prev, ...selectedFiles])
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (files.length === 0 || !metadata.trip) return
    
    setUploading(true)
    // TODO: Implement actual upload logic
    await new Promise(resolve => setTimeout(resolve, 2000))
    setUploading(false)
    alert('Upload functionality coming soon!')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Upload Media</h1>

      {/* Metadata Form */}
      <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
        <h2 className="font-semibold mb-4">Trip Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Trip Name *</label>
            <input
              type="text"
              value={metadata.trip}
              onChange={(e) => setMetadata(m => ({ ...m, trip: e.target.value }))}
              placeholder="e.g., Honduras"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Year *</label>
            <input
              type="text"
              value={metadata.year}
              onChange={(e) => setMetadata(m => ({ ...m, year: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm text-gray-400 mb-1">Location (optional)</label>
            <input
              type="text"
              value={metadata.location}
              onChange={(e) => setMetadata(m => ({ ...m, location: e.target.value }))}
              placeholder="e.g., San Pedro Sula"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-700 rounded-xl p-12 text-center hover:border-orange-500 transition-colors cursor-pointer"
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-500" />
        <p className="text-gray-300 mb-2">Drag & drop files here</p>
        <p className="text-gray-500 text-sm">or click to select</p>
        <input
          id="file-input"
          type="file"
          multiple
          accept="video/*,image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-6 space-y-2">
          <h3 className="font-medium mb-3">{files.length} files selected</h3>
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-900 rounded-lg p-3 border border-gray-800"
            >
              <div className="flex items-center gap-3">
                <Film className="w-5 h-5 text-orange-500" />
                <span className="truncate max-w-[300px]">{file.name}</span>
                <span className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(1)} MB
                </span>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="p-1 hover:bg-gray-800 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={files.length === 0 || !metadata.trip || uploading}
        className="mt-6 w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
      >
        {uploading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="w-5 h-5" />
            Upload {files.length} files
          </>
        )}
      </button>

      <p className="text-center text-gray-500 text-sm mt-4">
        Files will be processed automatically with AI descriptions
      </p>
    </div>
  )
}
