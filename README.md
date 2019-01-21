# Vanilla Blog

## 1. Setup

From your project directory, run the following:

```sh
$ git clone
$ cd
$ yarn (or npm install)
$ yarn dev (or npm run dev)
# visit http://localhost:3000
```

- HTML 수정: `/public/index.html`를 수정하시면 됩니다.
- JS 수정: `/src/client/index.js`를 수정하시면 됩니다. (파일 이름은 변경하지 마세요.)
- CSS 수정: 필요에 따라 `/src`디렉토리 내에  `.less`나 `.scss`를 생성하여 작업하시면 됩니다.

## 2. TODO

**서버 관련 코드는 절대 수정해서는 안됩니다.**

A list of requirements below:

### Step 1.

```no-highlight
Page URL: `/articles`
Summary: 사용자는 블로그 글 목록을 볼 수 있어야 합니다.
```

#### Acceptance Criteria

* 사용자가 `/`로 방문할 경우, `/articles`로 페이지 전환이 이루어져야 합니다.
* 블로그 포스트 목록을 서버로부터 받아서 보여주어야 합니다.
* 블로그 포스트 목록은 초기에 10개만 보여주어야 하고, 사용자가 화면 하단 200px 이하로 스크롤을 내릴 경우 10개를 추가로 보여주어야 합니다.
* 위 동작은 블로그 포스트 목록이 더 이상 없을때까지 반복적으로 적용됩니다.
* 목록에서는 각 블로그 포스트의 제목, 작성자, thumbnail image, 작성일, 태그 리스트, 댓글 갯수를 보여주어야 합니다.
* 목록의 각 포스트는 세부 내용(`/articles/:article_title`)로 이동할 수 있는 링크를 제공해주어야 합니다.
* 사용자는 작성일을 기준으로 오래된 순 또는 최신 순으로 정렬할 수 있어야 합니다.
* 사용자는 모든 태그의 리스트를 볼 수 있어야 하고, 각각의 태그를 클릭하여 해당 태그가 속한 블로그 포스트만을 목록에 보여주어야 합니다.
* 작성일 기준으로 정렬한 후, 태그를 선택한다면 작성일 기준으로 정렬되었던 상태는 다시 초기화되어야 합니다.
* 태그별로 분류한 후, 작성일 기준으로 정렬시킨다면 분류된 목록 내에서 작성일 기준으로 정렬되어야 합니다.

#### Related Server Endpoints

##### 1. GET `/api/v1/articles`

블로그 포스트 목록을 가져올 수 있는 endpoint입니다.

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

##### 2. GET `/api/v1/tags/:tag_id`

태그 상세 정보를 가져올 수 있는 endpoint입니다.

- Request Parameters

N/A

-  Sample Response

```js
{
    "name" : "javascript",
    "id" : 1
}
```

### Step 2.

```no-highlight
Page URL: `/articles/:article_title` (i.e. "/articles/what-to-do-when-im-bored")
Summary: 사용자는 글 세부 내용을 볼 수 있어야 합니다.
```

Acceptance Criteria:

* URL의 글 제목을 이용하여 글 상세 정보를 서버로부터 받아와야 합니다.
* 해당 글의 제목, 작성자, 작성일, 작성 시간, 본문 내용, 태그 리스트, 댓글 내용을 보여주어야 합니다.
* 댓글은 위에서부터 오래된 순으로 보여주어야 합니다.
* 사용자가 뒤로 가기를 눌렀을 경우, 다시 이전 페이지로 이동해야 합니다.
* 잘못된 제목을 URL에 입력했을 경우, 404 페이지가 보여져야 합니다.

#### Related Server Endpoints

##### 1. GET `/api/v1/articles/:article_id`

블로그 포스트 상세 정보를 가져올 수 있는 endpoint입니다.

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

##### 2. GET `/api/v1/articles/:article_id/comments`

블로그 포스트에 달린 댓글들의 정보를 가져올 수 있는 endpoint입니다.

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

### Step 3.

```no-highlight
Page URL: `/admin`
Summary: 사용자에게 관리자 페이지를 보여주어야 합니다.
```

Acceptance Criteria:

* 관리자 페이지에는 2개의 Tab(포스트 관리, 블로그 테마 관리)이 보여져야 합니다.
* 기본 화면은 포스트 관리 Tab입니다.
* 포스트 관리의 경우, URL은 `/admin/posts`입니다. 해당 Tab을 선택할 경우, 해당 URL로 이동합니다.
* 블로그 테마 관리의 경우, URL은 `/admin/theme`입니다. 해당 Tab을 선택할 경우, 해당 URL로 이동합니다.

### Step 4.

```no-highlight
Page URL: `/admin/posts`
Summary: 사용자는 블로그 포스트를 삭제할 수 있습니다.
```

Acceptance Criteria:

* 초기 화면에 블로그 포스트 목록이 최신 날짜 순으로 10개 보여야 합니다.
* "이전 페이지" 버튼과 "다음 페이지" 버튼이 보여야 합니다.
* 이전 페이지 목록이나 다음 페이지 목록이 없을 경우, 해당 버튼은 비활성화되어야 합니다.
* "이전 페이지" 버튼과 "다음 페이지" 버튼을 눌렀을 경우, 이전 또는 다음 블로그 포스트 목록을 보여주어야 합니다.
* 목록에는 각 포스트의 제목, 작성일, 그리고 "삭제" 버튼이 보여야 합니다.
* 포스트를 삭제하는 버튼을 눌렀을 경우, 해당 포스트를 삭제하는 요청을 서버에 보내야 합니다. 블로그 포스트 목록에 바로 반영되지는 않아도 됩니다.

#### Related Server Endpoints

##### 1. DELETE `/api/v1/articles/:article_id`

블로그 포스트를 삭제할 수 있는 endpoint입니다.

- Request Parameters

N/A

-  Sample Response

```js
{
    "result": "ok"
}
```

### Step 5.

```no-highlight
Page URL: `/admin/theme`
Summary: 사용자는 블로그 테마를 바꿀 수 있습니다.
```

Acceptance Criteria:

* 최소 3가지 이상의 테마를 선택할 수 있는 UI가 보여져야 합니다.
* 현재 블로그에 적용되어 있는 테마 혹은 기본 테마(자유롭게 지정하세요)가 보여져야 합니다.
* 테마는 화면의 배경 색깔만을 의미합니다.
* 사용자가 새로운 테마를 선택할 경우, 전체 웹 어플리케이션(관리자 페이지 포함)에 적용되어야 합니다.
* 새로 고침을 할 경우에는 대응하지 않아도 됩니다.

### Advanced

1. 현재 사용하고 있는 자체 서버 대신 [Firebase Database](https://firebase.google.com/) 이용하도록 수정해보세요.
1. [Firebase](https://firebase.google.com/)의 Database를 이용하여 관리자(블로그 글 수정,삭제,생성 등) 기능을 만들어 보세요.
2. [Firebase](https://firebase.google.com/)의 Database를 이용하여 테마 정보가 관리되게끔 만들어 보세요.
