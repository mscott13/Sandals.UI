var profileViewActive = false;
var dropdownVisible = false;

function IsModalActive() {
    if ($(".modal:visible").length > 0) {
        return true;
    }
    return false;
}

function SetSystemMessage(message, status) {
    $(".sys-message").removeClass("sys-message-positive sys-message-negative ");
    switch (status) {
        case "negative":
            $(".sys-message").addClass("sys-message-negative");
            break;
        case "positive":
            $(".sys-message").addClass("sys-message-positive");
            break;
    }

    $(".sys-message p").html(message);
    $(".sys-message").addClass("sys-visible").delay(15000).queue(function () {
        $(this).removeClass("sys-visible").dequeue();
    });
}

function InitEmptyActivityChart() {
    var activityData = {

        series: [
            [300, 100, 800, 1000, 1500, 200, 230, 91, 26, 0, 1100, 500, 300, 150, 900, 450, 600, 750, 800, 500, 1300, 1100, 1000, 530]
        ]
    };

    var options = {
        showPoint: false,
        showLine: false,
        showArea: true,
        fullWidth: true,
        showLabel: false,
        axisX: {
            showGrid: false,
            showLabel: false,
            offset: 15
        },
        axisY: {
            showGrid: false,
            showLabel: false,
            offset: 2
        },
        high: 1700,
        low: -0,
        chartPadding: 10,
        plugins: [
            Chartist.plugins.tooltip(),
            Chartist.plugins.ctAxisTitle({
                axisX: {
                    axisTitle: 'Time (mins)',
                    axisClass: 'ct-axis-title',
                    offset: {
                        x: 0,
                        y: 20
                    },
                    textAnchor: 'middle'
                }
            })
        ]
    };

    var chart = new Chartist.Bar('.ct-chart.activity', activityData, options);
    OverlayScrollbars(document.querySelectorAll(".timeline-container"), {});

    $(".content").overlayScrollbars({
        className: "os-theme-dark",
        resize: "none",
        sizeAutoCapable: true,
        clipAlways: true,
        normalizeRTL: true,
        paddingAbsolute: false,
        autoUpdate: null,
        autoUpdateInterval: 33,
        updateOnLoad: ["img"],
        nativeScrollbarsOverlaid: {
            showNativeScrollbars: false,
            initialize: true
        },
        overflowBehavior: {
            x: "scroll",
            y: "scroll"
        },
        scrollbars: {
            visibility: "auto",
            autoHide: "scroll",
            autoHideDelay: 800,
            dragScrolling: true,
            clickScrolling: false,
            touchSupport: true,
            snapHandle: false
        },
        textarea: {
            dynWidth: false,
            dynHeight: false,
            inheritedAttrs: ["style", "class"]
        },
        callbacks: {
            onInitialized: null,
            onInitializationWithdrawn: null,
            onDestroyed: null,
            onScrollStart: null,
            onScroll: null,
            onScrollStop: null,
            onOverflowChanged: null,
            onOverflowAmountChanged: null,
            onDirectionChanged: null,
            onContentSizeChanged: null,
            onHostSizeChanged: null,
            onUpdated: null
        }
    }); 

    chart.on('draw', function (activityData) {
        if (activityData.type == 'bar') {
            activityData.element.animate({
                y2: {
                    dur: '0.3s',
                    from: activityData.y1,
                    to: activityData.y2,
                    easing: Chartist.Svg.Easing.easeOutQuart
                }
            });
        }
    });
}

function InitActivityChart(h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13, h14, h15, h16, h17, h18, h19, h20, h21, h22, h23, h24, max) {
    var activityData = {

        series: [
            [h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13, h14, h15, h16, h17, h18, h19, h20, h21, h22, h23, h24]
        ]
    };

    var options = {
        showPoint: false,
        showLine: false,
        showArea: true,
        fullWidth: true,
        showLabel: false,
        axisX: {
            showGrid: false,
            showLabel: false,
            offset: 15
        },
        axisY: {
            showGrid: true,
            showLabel: false,
            offset: 2
        },
        high: max,
        low: -0,
        chartPadding: 10,
        plugins: [
            Chartist.plugins.tooltip(),
            Chartist.plugins.ctAxisTitle({
                axisX: {
                    axisTitle: 'Time (mins)',
                    axisClass: 'ct-axis-title',
                    offset: {
                        x: 0,
                        y: 20
                    },
                    textAnchor: 'middle'
                }
            })
        ]
    };

    var chart = new Chartist.Bar('.ct-chart.activity', activityData, options);
    OverlayScrollbars(document.querySelectorAll(".timeline-container"), {});
    OverlayScrollbars(document.querySelectorAll(".content"), {});

    chart.on('draw', function (activityData) {
        if (activityData.type == 'bar') {
            activityData.element.animate({
                y2: {
                    dur: '0.3s',
                    from: activityData.y1,
                    to: activityData.y2,
                    easing: Chartist.Svg.Easing.easeOutQuart
                }
            });
        }
    });
}

function FormatErrorsForAlert(errors) {
    var errorsHtml = "";
    $.each(errors, function (key, value) {
        errorsHtml += '<li>' + value + '</li>';
    });
    return errorsHtml;
}

$(document).ready(function () {

    $('[data-toggle="tooltip"]').tooltip()
    $(".download-images").click(function (e) {
        e.stopPropagation();
    });

    $(".profile-view").mouseenter(function (e) {
        profileViewActive = true;
    })
    $(".profile-view").mouseleave(function (e) {
        profileViewActive = false;
    })

    $(".dropdown-container").hover(function (e) {
        e.stopPropagation();
    });

    $(".order-item").click(function () {
        $(this).find(".order-content").toggleClass("o-detail-visible");
    });

    $('body').on("click", ".profile-view", function (e) {
        dropdownVisible = $(".dropdown-container").is(":visible");
        if (dropdownVisible) {
            if (profileViewActive) {
                $(".dropdown-container").css({ "display": "none" });
            }
        }
        else {
            $(".dropdown-container").css({ "display": "flex" });
        }
    });

    $(".bootdialog.close").click(function () {

    });

    $(document).click(function (e) {
        console.log(e.target.className);

        if (e.target.className.indexOf("dialog-actions") > 0) {
            return;
        }

        if (e.target.className !== "profile-view" && e.target.className !== "bootdialog close" && !IsModalActive()) {
            $(".dropdown-container").css({ "display": "none" });
        }
    });

    $(".dropdown-container").click(function (e) {
        e.stopPropagation();
    });

    $("#changePassword").click(function (e) {
        $('.change-password-modal').modal({
            backdrop: 'static',
            keyboard: false,
        });
    });

    $(".edit-order").click(function (e) {
        e.stopPropagation();
        var orderId = $(this).data("orderid");

        $('.edit-order-modal').modal({
            backdrop: 'static',
            keyboard: false,
        });
    })

    $(".edit-profile-link").click(function (e) {
        e.preventDefault();
        $('.edit-profile-modal').modal({
            backdrop: 'static',
            keyboard: false,
        });
    })

    $(".change-password-modal #btnClose, #change-password-corner-close").click(function () {
        setTimeout(function () {
            $(".password-alert-message").remove();
        }, 200);
    });

    $(".close-sys-msg").click(function () {
        $(".sys-message").removeClass("sys-visible")
    });

    $("#savePassword").click(function () {
        var button = $(this);
        $(button).html('<img src="/images/loading.svg" style="width:30px"/>');
        $(".password-alert-message").remove();

        var isValid = true;
        var errors = [];
        if ($("#change-pw-old").val() === '') {
            errors.push("Your current password is required");
            isValid = false;
        }

        if ($("#change-pw-new").val() === '') {
            errors.push("A new password is required");
            isValid = false;
        }

        if ($("#change-pw-confrirm").val() === '') {
            errors.push("Confirmation password is required");
            isValid = false;
        }

        if ($("#change-pw-confrirm").val() !== $("#change-pw-new").val()) {
            errors.push("New Password and Confirmation passwords do not match");
            isValid = false;
        }

        if (!isValid) {
            var html =
                '<div class="alert alert-warning alert-dismissible fade show password-alert-message" role = "alert">' +
                '<b>Submission error</b>' +
                '<ul>' +
                FormatErrorsForAlert(errors) +
                '</ul>' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '</div>';

            $(".change-password-modal .modal-body").append(html);
            $(button).html("Save changes");
        }
        else {
            $.ajax({
                url: "/account/changePassword",
                method: "POST",
                contentType: "application/json charset=utf8",
                data: JSON.stringify({
                    "password": $("#change-pw-old").val(),
                    "newPassword": $("#change-pw-new").val()
                }),
                success: function (result) {
                    $(button).html("Save changes");
                    $(".change-password-modal").modal('hide');
                    SetSystemMessage("Your password was updated successfully.", "positive");
                    console.log(result);
                },
                error: function (result) {
                    $(button).html("Save changes");
                    console.log(result);

                    if (result.status == 400) {
                        errors = [];
                        errors.push(result.responseJSON.message);

                        var html =
                            '<div class="alert alert-warning alert-dismissible fade show password-alert-message" role = "alert">' +
                            '<b>Error</b>' +
                            '<ul>' +
                            FormatErrorsForAlert(errors) +
                            '</ul>' +
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                            '<span aria-hidden="true">&times;</span>' +
                            '</button>' +
                            '</div>';

                        $(".change-password-modal .modal-body").append(html);
                    }
                    else if (result.status == 401) {
                        errors = [];
                        errors.push("You are currently unauthorized to use this action");

                        var html =
                            '<div class="alert alert-warning alert-dismissible fade show password-alert-message" role = "alert">' +
                            '<b>Error</b>' +
                            '<ul>' +
                            FormatErrorsForAlert(errors) +
                            '</ul>' +
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                            '<span aria-hidden="true">&times;</span>' +
                            '</button>' +
                            '</div>';

                        $(".change-password-modal .modal-body").append(html);
                    }
                    else {
                        errors = [];
                        errors.push("An unknown error has occurred.");

                        var html =
                            '<div class="alert alert-warning alert-dismissible fade show password-alert-message" role = "alert">' +
                            '<b>Error</b>' +
                            '<ul>' +
                            FormatErrorsForAlert(errors) +
                            '</ul>' +
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                            '<span aria-hidden="true">&times;</span>' +
                            '</button>' +
                            '</div>';

                        $(".change-password-modal .modal-body").append(html);
                    }
                }
            });
        }
    });

    if ($(".user-activity-card").data("dt-status") == "unavailable") {
        InitEmptyActivityChart();
    }
    else {
        var h0 = $(".user-activity-card").data("h0"); var h12 = $(".user-activity-card").data("h12");
        var h1 = $(".user-activity-card").data("h1"); var h13 = $(".user-activity-card").data("h13");
        var h2 = $(".user-activity-card").data("h2"); var h14 = $(".user-activity-card").data("h14");
        var h3 = $(".user-activity-card").data("h3"); var h15 = $(".user-activity-card").data("h15");
        var h4 = $(".user-activity-card").data("h4"); var h16 = $(".user-activity-card").data("h16");
        var h5 = $(".user-activity-card").data("h5"); var h17 = $(".user-activity-card").data("h17");
        var h6 = $(".user-activity-card").data("h6"); var h18 = $(".user-activity-card").data("h18");
        var h7 = $(".user-activity-card").data("h7"); var h19 = $(".user-activity-card").data("h19");
        var h8 = $(".user-activity-card").data("h8"); var h20 = $(".user-activity-card").data("h20");
        var h9 = $(".user-activity-card").data("h9"); var h21 = $(".user-activity-card").data("h21");
        var h10 = $(".user-activity-card").data("h10"); var h22 = $(".user-activity-card").data("h22");
        var h11 = $(".user-activity-card").data("h11"); var h23 = $(".user-activity-card").data("h23");
        var max = $(".user-activity-card").data("h24");

        InitActivityChart(h0, h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11,
            h12, h13, h14, h15, h16, h17, h18, h19, h20, h21, h22, h23, max);
    }
});