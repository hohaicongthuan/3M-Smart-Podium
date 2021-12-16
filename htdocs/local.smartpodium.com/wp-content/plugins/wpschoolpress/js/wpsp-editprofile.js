$(document).ready(function() {
  $("#Doj").datepicker({
    autoclose: !0,
    dateFormat: date_format,
    todayHighlight: !0,
    changeMonth: !0,
    changeYear: !0,
    yearRange: "-50:+0",
    maxDate: 0
  }), $("#Dob").datepicker({
    autoclose: !0,
    dateFormat: date_format,
    todayHighlight: !0,
    changeMonth: !0,
    changeYear: !0,
    maxDate: 0,
    yearRange: "-50:+0",
    beforeShow: function(e, a) {
      $(document).off("focusin.bs.modal")
    },
    onClose: function() {
      $(document).on("focusin.bs.modal")
    },
    onSelect: function(e) {
      $(this).valid()
    }
  }), $("#displaypicture").change(function() {
    var e = $(this).attr("id"),
      a = document.getElementById(e).files[0].size,
      s = $(this).val();
    a > 3145728 && ($("#test").html("Kích thước file phải nhỏ hơn 3 MB, xin hãy chọn file khác"), $(this).val(""));
    var t = s.substring(s.lastIndexOf(".") + 1); - 1 == $.inArray(t, ["jpg", "jpeg"]) && ($("#test").html("Xin hãy chọn file jpg hoặc jpeg"), $(this).val("")),
      function(e) {
        if (e.files) {
          var a = new FileReader;
          a.onload = function(e) {
            $("#img_preview").attr("src", e.target.result).width(112).height(112)
          }, a.readAsDataURL(e.files[0])
        }
      }(this)
  }), $("#StudentEditForm").validate({
    rules: {
      s_fname: "required",
      s_address: "required",
      s_lname: "required",
      s_zipcode: "required",
      s_rollno: "required",
      s_zipcode: {
        required: !0,
        number: !0
      },
      s_pzipcode: {
        required: !0,
        number: !0
      }
    },
    messages: {
      s_fname: "Nhập Tên",
      s_address: "Nhập Địa Chỉ Hiện Tại",
      s_lname: "Nhập Họ",
      s_rollno: "Nhập Mã Học Viên"
    },
    submitHandler: function(e) {
      document.getElementById("StudentEditForm");
      var a = new FormData,
        s = $("#StudentEditForm").serializeArray(),
        t = $("#displaypicture")[0].files[0];
      a.append("action", "UpdateStudent"), a.append("displaypicture", t), $.each(s, function(e, s) {
        a.append(s.name, s.value)
      }), a.append("data", s), $.ajax({
        type: "POST",
        url: ajax_url,
        data: a,
        cache: !1,
        processData: !1,
        contentType: !1,
        beforeSend: function() {
          $("#SavingModal").css("display", "block"), $("#studentform").attr("disabled", "disabled")
        },
        success: function(e) {
          if ($("#studentform").removeAttr("disabled"), "success0" == e) {
            $(".wpsp-popup-return-data").html("Student update successfully !"), $("#SuccessModal").css("display", "block"), $("#SavingModal").css("display", "none"), $("#SuccessModal").addClass("wpsp-popVisible");
            var a = $("#wpsp_locationginal").val() + "admin.php?page=sch-editprofile";
            setTimeout(function() {
              window.location.href = a
            }, 1e3);
            $("#StudentEntryForm").trigger("reset"), $("#studentform").attr("disabled", "disabled")
          } else $(".wpsp-popup-return-data").html(e), $("#SavingModal").css("display", "none"), $("#WarningModal").css("display", "block"), $("#WarningModal").addClass("wpsp-popVisible")
        },
        error: function() {
          $("#SavingModal").css("display", "none"), $("#WarningModal").css("display", "block"), $("#WarningModal").addClass("wpsp-popVisible"), $("#teacherform").removeAttr("disabled")
        },
        complete: function() {
          $(".pnloader").remove(), $("#studentform").removeAttr("disabled")
        }
      })
    }
  }), $("#ParentEditForm").validate({
    submitHandler: function(e) {
      document.getElementById("ParentEditForm");
      var a = new FormData,
        s = $("#ParentEditForm").serializeArray(),
        t = $("#displaypicture")[0].files[0];
      a.append("action", "UpdateStudent"), a.append("displaypicture", t), $.each(s, function(e, s) {
        a.append(s.name, s.value)
      }), a.append("data", s), console.log(s), $.ajax({
        type: "POST",
        url: ajax_url,
        data: a,
        cache: !1,
        processData: !1,
        contentType: !1,
        beforeSend: function() {
          $("#SavingModal").css("display", "block"), $("#parentform").attr("disabled", "disabled")
        },
        success: function(e) {
          if ($("#parentform").removeAttr("disabled"), "success0" == e) {
            $(".wpsp-popup-return-data").html("Cập Nhật Phụ Huynh Thành Công!"), $("#SuccessModal").css("display", "block"), $("#SavingModal").css("display", "none"), $("#SuccessModal").addClass("wpsp-popVisible");
            var a = $("#wpsp_locationginal").val() + "admin.php?page=sch-editprofile";
            setTimeout(function() {
              window.location.href = a
            }, 1e3);
            $("#parentform").attr("disabled", "disabled")
          } else $(".wpsp-popup-return-data").html(e), $("#SavingModal").css("display", "none"), $("#WarningModal").css("display", "block"), $("#WarningModal").addClass("wpsp-popVisible")
        },
        error: function() {
          $("#SavingModal").css("display", "none"), $("#WarningModal").css("display", "block"), $("#WarningModal").addClass("wpsp-popVisible"), $("#parentform").removeAttr("disabled")
        },
        complete: function() {
          $(".pnloader").remove(), $("#parentform").removeAttr("disabled")
        }
      })
    }
  }), $("#StudentEditForm").submit(function(e) {
    e.preventDefault()
  }), $("#TeacherEditForm").validate({
    rules: {
      firstname: "required",
      Address: "required",
      lastname: "required",
      Username: {
        required: !0,
        minlength: 5
      },
      Password: {
        required: !0,
        minlength: 4
      },
      ConfirmPassword: {
        required: !0,
        minlength: 4,
        equalTo: "#Password"
      },
      Email: {
        required: !0,
        email: !0
      },
      Phone: {
        number: !0,
        minlength: 7
      },
      zipcode: {
        required: !0,
        number: !0
      },
      whours: "required"
    },
    messages: {
      firstname: "Nhập Tên Giảng Viên",
      Address: "Nhập Địa Chỉ Hiện Tại",
      lastname: "Nhập Họ",
      Username: {
        required: "Nhập Tên Đăng Nhập",
        minlength: "Tên Đăng Nhập Phải Có Ít Nhất 5 Ký Tự"
      },
      Password: {
        required: "Nhập Mật Khẩu",
        minlength: "Mật Khẩu Phải Có Ít Nhất 5 Ký Tự"
      },
      Confirm_password: {
        required: "Nhập Mật Khẩu",
        minlength: "Mật Khẩu Phải Có Ít Nhất 5 Ký Tự",
        equalTo: "Nhập Mật Khẩu Tương Tự Như Trên"
      },
      Email: "Nhập địa chỉ email hợp lệ"
    },
    submitHandler: function(e) {
      document.getElementById("TeacherEditForm");
      var a = new FormData,
        s = $("#TeacherEditForm").serializeArray(),
        t = $("#displaypicture")[0].files[0];
      a.append("action", "UpdateTeacher"), a.append("displaypicture", t), $.each(s, function(e, s) {
        a.append(s.name, s.value)
      }), a.append("data", s), $.ajax({
        type: "POST",
        url: ajax_url,
        data: a,
        cache: !1,
        processData: !1,
        contentType: !1,
        beforeSend: function() {
          $("#u_teacher").attr("disabled", "disabled"), $("#SavingModal").css("display", "block")
        },
        success: function(e) {
          if ("success0" == e) {
            $(".wpsp-popup-return-data").html("Cập Nhật Giảng Viên Thành Công!"), $("#SuccessModal").css("display", "block"), $("#SavingModal").css("display", "none"), $("#SuccessModal").addClass("wpsp-popVisible");
            var a = $("#wpsp_locationginal").val() + "/admin.php?page=sch-editprofile";
            setTimeout(function() {
              window.location.href = a
            }, 1e3);
            $("#TeacherEditForm").trigger("reset"), $("#u_teacher").attr("disabled", "disabled")
          } else $(".wpsp-popup-return-data").html(e), $("#SavingModal").css("display", "none"), $("#WarningModal").css("display", "block"), $("#WarningModal").addClass("wpsp-popVisible")
        },
        error: function() {
          $("#SavingModal").css("display", "none"), $("#WarningModal").css("display", "block"), $("#WarningModal").addClass("wpsp-popVisible")
        },
        complete: function() {
          $(".pnloader").remove()
        }
      })
    }
  })
});
