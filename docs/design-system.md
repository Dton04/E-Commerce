# SmartCommerce AI — Design System & Foundations

**Version 1.0.0**  
Nguồn: Frame Figma [`A · Hệ thống thiết kế · Nền tảng và biểu mẫu` (`node-id=1008-32074`)](https://www.figma.com/design/WGl3jmmYz9hx9irUAGviYc/Untitled?node-id=1008-32074)

---

## 1. Nguyên tắc cốt lõi (Design Foundations)

- **Typography:** `Inter`, hỗ trợ tiếng Việt đầy đủ (`latin`, `vietnamese`).
- **Lưới cơ sở (Base Grid):** Bội số **8 px** (`8 · 16 · 24 · 32 · 48 · 64 px`).
- **Độ bo góc (Border Radius):**
  - Thẻ / Card / Container: **`12 px`** (`rounded-xl`).
  - Phần tử điều khiển (Inputs, Buttons, Dropdowns): **`8 px`** (`rounded-lg`).
- **Viền & Đổ bóng (Border & Shadow):**
  - Viền chuẩn: `1 px` màu `#E2E8F0` (Slate 200).
  - Đổ bóng nhẹ: `0 1px 2px 0 rgb(0 0 0 / 0.05)` hoặc `0 4px 6px -1px rgb(0 0 0 / 0.1)`.
- **Kích thước vùng bấm (Touch Target):**
  - Chiều cao các nút / ô nhập: **`40–44 px`**.
  - Vùng chạm tối thiểu trên thiết bị di động: **`≥ 44 px`**.

---

## 2. Bảng mã màu chuẩn (Color Palette)

| Vai trò | Hex Code | Tailwind Equivalent | Mục đích sử dụng |
| :--- | :--- | :--- | :--- |
| **Primary Brand** | `#4338CA` | `indigo-700` | Nút chính, CTA, link đang chọn, focus ring |
| **Primary Hover** | `#3730A3` | `indigo-800` | Trạng thái hover của nút Primary |
| **Primary Light** | `#EEF2FF` | `indigo-50` | Nền phụ, chip gợi ý, icon background, secondary button |
| **Text Primary / Dark** | `#0F172A` | `slate-900` | Tiêu đề chính, nhãn quan trọng, top bar announcement |
| **Text Secondary / Muted** | `#64748B` | `slate-500` | Mô tả phụ, placeholder, chú thích, số lượt đánh giá |
| **Background Neutral** | `#F8FAFC` | `slate-50` | Nền ô input, nền footer, nền container ảnh |
| **Border / Divider** | `#E2E8F0` | `slate-200` | Đường phân cách, viền thẻ card, viền input |
| **Success** | `#16A34A` | `green-600` | Trạng thái thành công, bảo vệ người mua 100%, in stock |
| **Danger / Destructive** | `#DC2626` | `red-600` | Thao tác xóa, hủy đơn, lỗi xác thực trường |

---

## 3. Hệ thống phân cấp Typography

| Phân cấp | Size / Line-height | Weight | Tailwind Classes |
| :--- | :--- | :--- | :--- |
| **Tiêu đề trang (Page Title)** | 28px / 35px | 600 (SemiBold) | `text-2xl sm:text-[28px] font-semibold leading-[35px]` |
| **Tiêu đề mục (Section Title)** | 22px / 28px | 600 (SemiBold) | `text-lg sm:text-[22px] font-semibold leading-[28px]` |
| **Tiêu đề thẻ (Card Title)** | 16px / 24px | 600 (SemiBold) | `text-base font-semibold leading-[24px]` |
| **Nội dung thân (Body Text)** | 14px / 21px | 400 (Regular) | `text-sm font-normal leading-[21px]` |
| **Chú thích / Nhãn phụ (Caption)** | 12px / 18px | 400 (Regular) | `text-xs font-normal leading-[18px]` |

---

## 4. Quy chuẩn Nút hành động (Buttons)

> **Quy tắc vàng:** *"Một hành động chính cho mỗi quyết định. Màu đỏ chỉ dành cho thao tác phá hủy (destructive actions)."*

1. **Primary Button:** Nền `#4338CA`, chữ trắng, bo góc `8px`, padding `8px 16px` (`h-10 sm:h-11`).
2. **Secondary Button:** Nền `#EEF2FF`, chữ `#4338CA`, bo góc `8px`, không viền.
3. **Outline / Default Button:** Nền trắng `#FFFFFF`, viền `#E2E8F0`, chữ `#4338CA` hoặc `#0F172A`.
4. **Destructive Button:** Nền `#DC2626`, chữ trắng, dùng cho các nút Hủy, Xóa vĩnh viễn.
5. **Disabled Button:** Nền `#E2E8F0`, chữ `#64748B`, con trỏ `not-allowed`.
6. **Focus State:** `focus:ring-2 focus:ring-[#4338CA] focus:outline-none`.

---

## 5. Quy chuẩn Biểu mẫu & Trường nhập liệu (Forms & Inputs)

> **Quy tắc vàng:** *"Nhãn luôn hiển thị (không dùng placeholder thay thế nhãn). Lỗi gắn trực tiếp với trường và giải thích cụ thể, không chỉ phân biệt bằng màu sắc."*

- **Trường nhập thông thường:**
  - Nhãn: `text-xs sm:text-sm font-medium text-slate-700 mb-1.5 block`. Ký hiệu bắt buộc màu đỏ (`*`).
  - Ô input: Nền `#F8FAFC`, viền `#E2E8F0`, chiều cao `40-44px`, chữ `#0F172A`.
  - Trạng thái Focus: Viền `#4338CA`, vòng `focus:ring-2 focus:ring-[#4338CA]/10`.
- **Trạng thái Lỗi (Validation Error):**
  - Viền đỏ `#DC2626`.
  - Dòng text thông báo lỗi trực tiếp bên dưới ô: `text-xs text-[#DC2626] mt-1 flex items-center gap-1`.
- **Trường chỉ đọc (Read-only / Disabled):**
  - Nền `#F1F5F9`, chữ `#64748B`, có chú thích *"Không thể sửa"*.
- **Dropdown / Select:**
  - Hiển thị dấu tích `✓` cho lựa chọn đang kích hoạt.
- **Checkbox & Radio:**
  - Có đủ 4 trạng thái: Đã chọn, Chưa chọn, Chọn một phần (`indeterminate` cho giỏ hàng), và Vô hiệu hóa.

