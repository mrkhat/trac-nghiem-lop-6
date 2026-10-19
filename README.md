# 📚 Trắc nghiệm Lớp 6

Trang web trắc nghiệm tương tác cho học sinh lớp 6 ôn tập các môn học.

## Cách dùng

Mở file `index.html` bằng trình duyệt, chọn môn học và chế độ:

- **📝 Luyện tập**: bấm đáp án → biết ngay đúng/sai từng câu, kèm giải thích
- **⏱️ Thi thử**: 20 câu ngẫu nhiên, làm hết mới hiện kết quả tổng

## Các môn hiện có

| Môn | Số câu | Nội dung |
|-----|--------|----------|
| 🔬 KHTN 6 | 67 | Giữa kì 1 (30 câu đề thi + 37 câu đề cương ôn tập) |

## Thêm môn mới

1. Tạo thư mục mới, ví dụ `toan/`
2. Thêm file `questions.json` theo định dạng:
```json
[
  {
    "id": 1,
    "question": "Nội dung câu hỏi?",
    "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
    "answer": 1,
    "explanation": "Giải thích ngắn"
  }
]
```
(`answer` là chỉ số đáp án đúng, bắt đầu từ 0)
3. Copy file `khtn/index.html` sang thư mục mới, sửa tiêu đề
4. Thêm card môn mới vào `index.html` gốc
