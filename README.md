# Vanilla-Blog

local server api를 통해 Blog를 만들어보는 과제

![Vanilla-Blog](vanilla-blog.gif)


## Setup

From your project directory, run the following:

```sh
$ git clone
$ cd
$ yarn (or npm install)
$ yarn dev (or npm run dev)
# visit http://localhost:3000
```

## Features

```no-highlight
Page URL: `/articles`
Summary: article 리스트 페이지
```
```no-highlight
Page URL: `/articles/:article_title` (i.e. "/articles/what-to-do-when-im-bored")
Summary: 글 세부 내용 페이지
```
```no-highlight
Page URL: `/admin`
Summary: 관리자 페이지
```
```no-highlight
Page URL: `/admin/posts`
Summary: 포스트 관리 페이지
```
```no-highlight
Page URL: `/admin/theme`
Summary: 블로그 테마 관리 페이지
```

* 사용자가 `/`로 방문할 경우, `/articles`로 페이지 전환
* 블로그 포스트 목록을 서버로부터 받아서 출력
* 무한스크롤 구현
* 목록에서는 각 블로그 포스트의 제목, 작성자, thumbnail image, 작성일, 태그 리스트, 댓글 갯수 출력
* 목록의 각 포스트는 세부 내용(`/articles/:article_title`)로 이동할 수 있는 링크를 제공
* 작성일, 인기순으로 정렬 가능
* 태그별 정렬 가능
* URL의 글 제목을 이용하여 글 상세 정보를 서버로부터 호출
* 상세정보 출력 시 해당 글의 제목, 작성자, 작성일, 작성 시간, 본문 내용, 태그 리스트, 댓글 내용 출력
* 댓글 시간 순 출력
* 이전 페이지 이동 시 복원
* 404페이지
* 관리자 페이지를 통해 포스트 관리(삭제 기능) 제공 `/admin/posts`, 테마 관리 제공(색상 테마 변경) `/admin/theme`

  

## Related Server Endpoints

#### 1. GET `/api/v1/articles`

블로그 포스트 목록을 가져올 수 있는 endpoint

- Request Parameters

| Parameter | Required | Type | Default Value | Description |
|-----------|----------|------|---------------|-------------|
| limit     |  N       | Int  |  50           | 검색 결과 건수 |
| sort      |  N       | String  |     "asc"    | 날짜순 정렬 지정 ("asc", "dsc") |
| pageIndex |  N       | Int  |     0    | 검색하고자 하는 페이지 인덱스 |

-  Sample Response

```js
{
    "total_post_count": 201,
    "page_index": 0,
    "posts": [
        {
            "by" : "ken huh",
            "comments_count" : 23,
            "id" : 2931,
            "created_at" : "2018-08-11T07:09:23.843Z",
            "tags": [ 1, 4, 7 ]
            "title" : "What time is it here?",
            "thumbnail_image_url" : "https://dummyimage.com/600x400/000/fff"
        },
        {
            "by" : "wan huh",
            "comments_count" : 12,
            "id" : 2934,
            "created_at" : "2018-09-21T02:10:43.376Z",
            "tags": [ 10, 11 ]
            "title" : "What time is it there?",
            "thumbnail_image_url" : "https://dummyimage.com/600x400/fff/000"
        }
    ]
}
```

#### 2. GET `/api/v1/tags/:tag_id`

태그 상세 정보를 가져올 수 있는 endpoint

- Request Parameters

N/A

-  Sample Response

```js
{
    "name" : "javascript",
    "id" : 1
}
```

#### 3. GET `/api/v1/articles/:article_id`

블로그 포스트 상세 정보를 가져올 수 있는 endpoint

- Request Parameters

N/A

-  Sample Response

```js
{
    "by" : "ken huh",
    "comments_id" : [ 12, 15, 17, 21, 49 ],
    "id" : 2931,
    "created_at" : "2018-08-11T07:09:23.843Z",
    "tags": [ 1, 4, 7 ]
    "title" : "What time is it here?",
    "body": "Hello, it is 3:20 PM here."
}
```

#### 4. GET `/api/v1/articles/:article_id/comments`

블로그 포스트에 달린 댓글들의 정보를 가져올 수 있는 endpoint

- Request Parameters

N/A

-  Sample Response

```js
[
  {
    "by" : "ken huh",
    "id" : 2223,
    "created_at" : "2018-08-11T07:09:23.843Z",
    "text": "Great article! Thanks!"
  }
]
```

#### 5. DELETE `/api/v1/articles/:article_id`

블로그 포스트를 삭제할 수 있는 endpoint

- Request Parameters

N/A

-  Sample Response

```js
{
    "result": "ok"
}
```
