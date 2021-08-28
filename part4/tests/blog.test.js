const listHelper = require('../utils/list_helper');
const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const api = supertest(app);
const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];
beforeAll((done) => {
  done();
});

test('dummy returns one', () => {
  const emptyBlogs = [];

  const result = listHelper.dummy(emptyBlogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('when list has many blogs', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe('Find max like', () => {
  test('many blogs', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });
});

describe('Find author with most blog', () => {
  test('most blog', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });
});

describe('Find author with most likes', () => {
  test('most likes', () => {
    expect(listHelper.mostLikes(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
});

// describe('Return correct amount of blogs', () => {
//   test('Length of blogs', async () => {
//     const response = await api.get('/api/blogs');
//     expect(response.body).toHaveLength(10);
//   });
// });
describe('Check if id field is avalable', () => {
  test('check id field', async () => {
    const response = await api.get('/api/blogs');
    for (let item of response.body) {
      expect(item.id).toBeDefined();
    }
  });
});
describe('Check if it can post a blog', () => {
  test('check if posting is ok', async () => {
    const data = {
      title: 'CLM',
      author: 'AGUGu',
      url: 'abc.com',
      likes: 12,
    };
    const initialRes = await api.get('/api/blogs');
    const initialLength = initialRes.body.length;
    const response = await api
      .post('/api/blogs')
      .set(
        'Authorization',
        'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYW5nIiwibmFtZSI6IkNoYW5nIiwiaWQiOiI2MTExN2E3NTFiMTIxYzA3NGZhMjkxMjIiLCJpYXQiOjE2MzAxNTQyMjJ9.h-AA19qZ79pzi4otpPaIbIEzaqM_r7onzj_GyNny_1o',
      )
      .send(data)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const laterRes = await api.get('/api/blogs');
    const laterLength = laterRes.body.length;
    expect(response.body.title).toContain(data.title);
    expect(laterLength).toBe(initialLength + 1);
  }, 200000);
  test.only('check if post failed', async () => {
    const data = {
      title: 'CLM',
      author: 'AGUGu',
      url: 'abc.com',
      likes: 12,
    };
    const initialRes = await api.get('/api/blogs');
    const initialLength = initialRes.body.length;
    const response = await api
      .post('/api/blogs')
      // .set(
      //   'Authorization',
      //   'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYW5nIiwibmFtZSI6IkNoYW5nIiwiaWQiOiI2MTExN2E3NTFiMTIxYzA3NGZhMjkxMjIiLCJpYXQiOjE2MzAxNTQyMjJ9.h-AA19qZ79pzi4otpPaIbIEzaqM_r7onzj_GyNny_1o',
      // )
      .send(data)
      .expect(401);
    // const laterRes = await api.get('/api/blogs');
    // const laterLength = laterRes.body.length;
    // expect(response.body.title).toContain(data.title);
    // expect(laterLength).toBe(initialLength + 1);
  }, 200000);
});
describe('Check if the like is missing', () => {
  test('set like to 0 if it is missing', async () => {
    const data = {
      title: 'dcm',
      author: 'ahuhu',
      url: 'def.com',
    };

    const response = await api.post('/api/blogs').send(data).expect(201);
    expect(response.body.likes).toBe(0);
  });
});

describe('Check if the title and url are missing', () => {
  test('set status code to be 400 if they are missing', async () => {
    const data = {
      author: 'ahuhu',
      likes: 34,
    };

    await api.post('/api/blogs').send(data).expect(400);
  }, 100000);
});

describe('Test deleting', () => {
  test('Deleting 1 id', async () => {
    await api.delete('/api/blogs/60f97e4739ba3f936224e942').expect(204);
  });
});
describe('Test update', () => {
  const data = {
    title: 'ee2',
    author: 'fadd',
    url: 'www.com',
    likes: 333,
  };
  test('update 1 id', async () => {
    await api.put('/api/blogs/60f964bd637dd232b09a7bd9').send(data);
  });
});
afterAll((done) => {
  mongoose.connection.close();
  done();
});
