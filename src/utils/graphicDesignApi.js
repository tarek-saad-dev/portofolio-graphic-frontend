const API_BASE_URL = 'https://portfolio-graphic-server.vercel.app';

export const fetchProjects = async(filters = {}) => {
        try {
            const params = new URLSearchParams();

            if (filters.category) params.append('category', filters.category);
            if (filters.q) params.append('q', filters.q);
            if (filters.sort) params.append('sort', filters.sort);
            if (filters.page) params.append('page', filters.page);
            if (filters.limit) params.append('limit', filters.limit);
            if (filters.includeDraft !== undefined) params.append('includeDraft', filters.includeDraft);

            const queryString = params.toString();
            const url = `${API_BASE_URL}/api/gd/projects${queryString ? `?${queryString}` : ''}`;
    
    console.log('Fetching projects from:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers.get('content-type'));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Received non-JSON response:', text.substring(0, 200));
      throw new Error(`Expected JSON but received ${contentType || 'unknown content type'}`);
    }
    
    const data = await response.json();
    console.log('Successfully fetched projects:', data.pagination?.total || 0, 'total');
    return data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const fetchProjectBySlug = async (slug) => {
  try {
    const url = `${API_BASE_URL}/api/gd/projects/${slug}`;
    
    console.log('Fetching project from:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Failed to fetch project: ${response.status} ${response.statusText}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Received non-JSON response:', text.substring(0, 200));
      throw new Error(`Expected JSON but received ${contentType || 'unknown content type'}`);
    }
    
    const data = await response.json();
    console.log('Successfully fetched project:', data.data?.title || slug);
    return data;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};