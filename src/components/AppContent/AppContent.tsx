const handleCreate = (title: string, content: string, tag: string) => {
  createMutation.mutate({ title, content, tag })
  setModalOpen(false)
}
