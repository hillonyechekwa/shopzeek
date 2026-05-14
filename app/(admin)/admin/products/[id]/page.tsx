

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Product Details</h1>
      <p>Product ID: {params.id}</p>
    </div>
  )
}