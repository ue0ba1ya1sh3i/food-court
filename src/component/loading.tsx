export function LoadingComponent() {
  return (
    <div className="fixed inset-0 z-50 bg-black/10 flex items-center justify-center">
      <div className="animate-spin size-32 border-4 border-side-main rounded-full border-t-transparent"></div>
    </div>
  )
}
