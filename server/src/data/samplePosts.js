const samplePosts = [
  {
    title: 'Building a Design-First Blog with React and Express',
    content:
      'Great blogs feel intentional: clean typography, thoughtful spacing, and clear hierarchy. In this post we map a modern UI to a production-ready API. We break the build into layouts, routes, and data layers, then tie it together with pagination and search. The final result is a fast, responsive site that scales with your content.',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    tags: ['react', 'express', 'design'],
    status: 'published',
  },
  {
    title: 'Scaling Content: Tags, Search, and Pagination Done Right',
    content:
      'Search and tags help readers discover content quickly. We explore how to model tags in MongoDB, how to build a flexible search query, and how to paginate without heavy server load. Along the way we add clear loading states so users always know what is happening.',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    tags: ['mongodb', 'search', 'ux'],
    status: 'published',
  },
  {
    title: 'Secure Auth for a Modern Blog',
    content:
      'Authentication is more than login forms. We cover password hashing, JWT access tokens, protected routes, and how to keep the code beginner-friendly. The end result is a secure and maintainable auth flow that supports both readers and authors.',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    tags: ['auth', 'security', 'jwt'],
    status: 'published',
  },
];

export default samplePosts;
